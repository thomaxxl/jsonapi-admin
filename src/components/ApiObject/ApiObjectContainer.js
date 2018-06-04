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

class ApiObjectListContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectedId: null,
            modal : null,
        }

    }

    handleRowSelect(row, isSelected) {

        if (isSelected) {
            this.setState({selectedId: row.id});
        }
        else {
            this.setState({selectedId: null});
        }
    }

    componentDidMount() {
        this.props.action.getAction(this.props.objectKey)
            .catch(error => {
                toastr.error(error)
            })
    }

    getSelectedItem(){
        let items = this.props.datas[this.props.objectKey]
        let result = null
        for (var item of items){
            if(item.id === this.state.selectedId){
                return item
            }
        }
        toastr.error('Item not found')

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
                <div className="row mt-3">
                    <div className="col">
                        <h1>{this.props.item.Title}</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            {this.props.item.actions.map((action, index) => 
                                this.renderAction(action)
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <List data={this.props.datas [this.props.objectKey]} 
                              handleRowSelect={this.handleRowSelect.bind(this)} 
                              columns={this.props.item.column}/>
                    </div>
                </div>
                {this.state.modal}
            </div>
        );
    }
}

export default ApiObjectListContainer