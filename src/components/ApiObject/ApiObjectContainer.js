import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { Button } from 'reactstrap';
import List from '../Common/List';
import * as Param from '../../Config';
import { Route } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import './style.css'

const DEFAULT_PAGE_SIZE = 50
const DEFAULT_PAGE_OFFSET = 0
const WAIT_INTERVAL = 280;
const ENTER_KEY = 13;

const toasterPosition =  {positionClass: "toast-top-right"}

class ModalContainer extends React.Component {
    render(){
        return <div>{this.props.modal}</div>
    }
}


class SearchInput extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.value
        }
        this.triggerChange = this.triggerChange.bind(this)
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange(event) {
        let value = event.target.value
        clearTimeout(this.timer);
        this.setState({ value });
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange()
        }
    }

    triggerChange() {
        const { value } = this.state;
        this.props.onChange(value);
    }

    render() {
        
        return (
            <Input
                className="search"
                placeholder='Search'
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
            />
        );
    }
}

class ApiObjectContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIds: [],
            modal : null,
            offset : DEFAULT_PAGE_OFFSET,
            sizePerPage: DEFAULT_PAGE_SIZE,
            offset: this.props.api_data[this.props.objectKey].offset, 
            limit: this.props.api_data[this.props.objectKey].limit 
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.getAction = this.getAction.bind(this)
        this.actions = {}
    }

    getAction(...extraArgs){
        // Retrieve the data from the api
        let config  = Param.APP[this.props.objectKey]
        let request_args = config.request_args ? config.request_args : {}
        let getArgs = [ this.props.objectKey, this.state.offset, this.state.sizePerPage, request_args]
        return this.props.action.getAction(...getArgs).catch(error => {
                toastr.error(error, '', toasterPosition)
            })
    }

    handleRowSelect(itemData, state, index) {
        var orgIndex = this.state.selectedIds.indexOf(itemData.id);

        if (state && orgIndex == -1){
            this.state.selectedIds.push(itemData.id)
        }
        else if (!state && orgIndex != -1){
            this.state.selectedIds.splice(orgIndex, 1)
        }
    }

    componentDidMount() {
        // Retrieve the data from the api
        this.getAction()
    }

    onTableChange(page,sizePerPage){
        var newOffset = (page-1) * sizePerPage
        this.setState({ offset: newOffset, sizePerPage: sizePerPage })
        this.getAction()
    }

    getSelectedItems(){
        /*
            Return all selected items
        */
        if(this.state.selectedIds.length == 0){
            toastr.error('No item selected', '', toasterPosition)
            return null
        }

        let items = this.props.api_data[this.props.objectKey].data
        var selItems = [];
        for (var item of items) {
            if(this.state.selectedIds.indexOf(item.id) >= 0) {
                selItems.push(item);
            }
        }
        if (selItems.length == 0){
            toastr.error('Item not found', '', toasterPosition)
        }
        return selItems;
    }

    getSelectedItem(){
        /*
            Return one selected item, error if more
        */
        let selectedItems = this.getSelectedItems()
        if(!selectedItems){
            return {} // error already shown in getSelectedItems
        }
        if(selectedItems.length > 1){
            toastr.error('To many items selected')
        }
        return selectedItems[0]
    }


    renderAction(action_name){
        /*
            Render the action (button) specified in the Config.json
            The action should be mapped in the Param.ActionList
        */
        const Action = Param.ActionList[action_name]
        if(!Action){
            console.log(`Invalid Action ${action_name}`)
            return <div/>
        }
        
        const action = <Action key={action_name}
                               selectedIds={this.state.selectedIds}
                               objectKey={this.props.objectKey}
                               parent={this} />
        this.actions[action_name] = action
        return action
    }

    handleSearch(value){
        this.props.api_data[this.props.objectKey].search = value
        this.getAction()
    }

    handleSave(column){
        /*/[ this.props.objectKey, this.state.offset, this.state.sizePerPage, request_args]
            var offset = this.props.datas [this.props.objectKey].offset;
        var limit = this.props.datas [this.props.objectKey].limit;
        
        this.props.action.saveAction(this.props.objectKey, post, offset, limit)
        
        */
        let saveArgs = [ this.props.objectKey, column, this.state.offset, this.state.limit ]

        return this.props.action.saveAction(...saveArgs).catch(error => {
                toastr.error(error, '', toasterPosition)
            }).then( toastr.success('saved', '', toasterPosition))
    }

    handleSaveRelationship(newValue, row, column){
        /*/[ this.props.objectKey, this.state.offset, this.state.sizePerPage, request_args]
            var offset = this.props.datas [this.props.objectKey].offset;
            var limit = this.props.datas [this.props.objectKey].limit;
        
        this.props.action.saveAction(this.props.objectKey, post, offset, limit)
        
        */
        let rel_name = column.relationship
        let relArgs = [ this.props.objectKey, row.id, rel_name, newValue ]
        return this.props.action.updateRelationshipAction(...relArgs).catch(error => {
                toastr.error(error, '', toasterPosition)
            }).then( toastr.success('saved', '', toasterPosition))
    }

    render() {

        let data = this.props.api_data[this.props.objectKey]

        //console.log("container data:",data)

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-group" role="group">
                            {this.props.item.actions.map((action_name) => 
                                this.renderAction(action_name)
                            )}
                            <div className="search-ctr">
                                <SearchInput onChange={this.handleSearch}/>
                            </div>
                        </div>

                        <List data={data} 
                              actions={this.actions}
                              handleRowSelect={this.handleRowSelect.bind(this)} 
                              columns={this.props.item.column}
                              selectedIds={this.state.selectedIds}
                              filter={ this.props.api_data[this.props.objectKey].filter }
                              onChange={this.handleSearch.bind(this)}
                              handleSave={this.handleSave.bind(this)}
                              handleSaveRelationship={this.handleSaveRelationship.bind(this)}
                              onTableChange={this.onTableChange.bind(this)}/>
                    </div>
                </div>
                <ModalContainer modal={this.state.modal} />
            </div>
        )
    }
}



export default  ApiObjectContainer