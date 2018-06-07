import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'reactstrap';
import List from '../Common/List';
import * as Param from '../../Config';
import { Route } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert'
import ActionList from '../../action/ActionList'


class ModalContainer extends React.Component {
    render(){
        return <div>{this.props.modal}</div>
    }
}
class ApiObjectListContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIds: [],
            modal : null,
        }
    }

    handleRowSelect(itemData, state, index) {
        var orgIndex = this.state.selectedIds.indexOf(itemData.id);

        if (state && orgIndex == -1)
            this.state.selectedIds.push(itemData.id);
        else if (!state && orgIndex != -1)
            this.state.selectedIds.splice(orgIndex, 1);
    }

    componentDidMount() {
        this.props.action.getAction(this.props.objectKey, 0, 10)
            .catch(error => {
                toastr.error(error, '', {positionClass: "toast-top-center"})
            })
    }

    onTableChange(page,sizePerPage){
        var newOffset = (page-1) * sizePerPage;
        this.props.action.getAction(this.props.objectKey,newOffset,sizePerPage)
        .catch((error)=>{
            toastr.error(error,'',{positionClass:'toast-top-center'})
        })
    }

    getSelectedItem(){
        let items = this.props.datas[this.props.objectKey]
        if(this.state.selectedIds.length == 0){
            toastr.error('No item selected', '', {positionClass: "toast-top-center"})
        }

        var selItems = [];
        for (var item of items) {
            if(this.state.selectedIds.indexOf(item.id)) {
                selItems.push(item);
            }
        }
        if (selItems.length == 0)
            toastr.error('Item not found', '', {positionClass: "toast-top-center"})
        else
            return selItems;
    }

    renderAction(action_name){
        const Action = ActionList[action_name]
        return <Action key={action_name} 
                       objectKey={this.props.objectKey}
                       parent={this} />
    }

    render() {       
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{this.props.item.Title}</h1>
                        <hr/>

                        <div className="btn-group" role="group">
                            {this.props.item.actions.map((action_name) => 
                                this.renderAction(action_name)
                            )}
                        </div>

                        <List data={this.props.datas[this.props.objectKey]} 
                            handleRowSelect={this.handleRowSelect.bind(this)} 
                            columns={this.props.item.column}
                            selectedIds={this.state.selectedIds}
                            filter={this.props.datas[this.props.objectKey].filter}
                            onTableChange={this.onTableChange.bind(this)}/>
                    </div>
                </div>
                <ModalContainer modal={this.state.modal} />
            </div>
        )
    }
}



export default  ApiObjectListContainer