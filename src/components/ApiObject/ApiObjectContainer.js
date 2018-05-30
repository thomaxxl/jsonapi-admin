import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';
import AnalyzeAction from '../actions/AnalyzeAction'; 

import * as ObjectAction from '../../action/ObjectAction';
import * as ModalAction from '../../action/ModalAction';
import * as FormAction from '../../action/FormAction';
import toastr from 'toastr';
import { Button } from 'reactstrap';
import List from '../Common/List';
import DModal from '../Common/Modal';
import Analyze from '../Common/Analyze';
import * as Param from '../../config_ui';
import { Route } from 'react-router-dom';

class ApiObjectListContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedId: 'No',
            ModalTitle: 'undefined',
            actions : Param.App_structure.User.Actions,
            // api_objects : this.props.api_objects
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAnalyze = this.handleAnalyze.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedId: row.id});
        }
        else{
            this.setState({selectedId: 'No'});
        }
    }

    handleAdd(){
        this.setState({ModalTitle: 'New'});
        this.props.modalaction.getModalAction(true);
        this.props.formaction.getFormAction(true);
    }

    handleEdit(){
        this.setState({ModalTitle: 'Edit'});
        if(this.state.selectedId!='No')
        {
            this.props.action.getSingleAction(this.state.selectedId);
            this.props.modalaction.getModalAction(true);
            this.props.formaction.getFormAction(true);
        }
    }

    handleDelete(){
        this.setState({ModalTitle: 'Delete'});
        if(this.state.selectedId!='No'){
            this.props.action.deleteAction(this.state.selectedId)
                .then(()=>{
                    toastr.warning('Deleted');
                });
            this.state.selectedId = 'No';
        }
    }

    handleAnalyze(){
        this.setState({ModalTitle: 'Analyze'});
        if(this.state.selectedId!='No')
        {
            this.props.action.getSingleAction(this.state.selectedId);
            this.props.modalaction.getAnalyzeAction(true);
        }
    }


    componentDidMount() {
        this.props.action.getAction()
            .catch(error => {
                toastr.error(error);
            });
    }

    render_action(action,i){
        if(action == 'CreateAction')
            return <CreateAction onClick={this.handleAdd} key = {i}/>
        
        else if(action == 'EditAction'){
            return <EditAction onClick={this.handleEdit} key = {i} />            
        }
        else if(action == 'DeleteAction'){
            return <DeleteAction onClick={this.handleDelete} key = {i} />          
        }
        else if(action == 'AnalyzeAction'){
            return <AnalyzeAction onClick={this.handleAnalyze} key = {i} />            
        }
    }

    render() {
        let data = this.props.api_objects;
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Users</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            {this.state.actions.map((action,i) => 
                                this.render_action(action,i)
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <List data={data} handleRowSelect={this.handleRowSelect} column_names={this.props.columns}/>
                    </div>
                </div>
                <DModal action={this.props.action} formdata={this.props.formdata} ModalTitle={this.state.ModalTitle} column_names={this.props.columns}  />
                <Analyze ModalTitle={this.state.ModalTitle} column_names={this.props.columns}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    api_objects: state.UsersReducer.datas,
    formdata: state.selectedUserReducer.data,
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(ObjectAction, dispatch),
    modalaction: bindActionCreators(ModalAction,dispatch),
    formaction: bindActionCreators(FormAction,dispatch),
});

function get_ApiObjectList(collection, columns){

    const mapStateToProps = state => ({
        api_objects: state.UsersReducer.datas,
        formdata: state.selectedUserReducer.data,
        columns : columns
    });

    const mapDispatchToProps = dispatch => ({
        action: bindActionCreators(ObjectAction, dispatch),
        modalaction: bindActionCreators(ModalAction,dispatch),
        formaction: bindActionCreators(FormAction,dispatch),
    });

    const Results = connect(mapStateToProps,mapDispatchToProps)(ApiObjectListContainer);
    return Results
}


class ApiRoute extends React.Component {

    render() {
        const ApiObjectContainer = get_ApiObjectList(this.props.collection, this.props.columns)
        return <Route path={this.props.path} component={ApiObjectContainer} />
    }
}


export default ApiRoute