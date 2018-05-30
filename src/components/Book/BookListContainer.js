import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';
import AnalyzeAction from '../actions/AnalyzeAction'; 

import * as ObjectAction from '../../action/BookAction'; 

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

        // TODO: use classes instead of strings (same comment as in App.js)

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
                        <h1>{this.props.title}</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            {this.props.actions.map((action,i) => 
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

class ApiRoute extends React.Component {

    render() {
        
        // TODO: Create reducers based on props

        const mapStateToProps = state => ({
            api_objects: state.BooksReducer.datas,
            formdata: state.selectedBookReducer.data,
        });

        const mapDispatchToProps = dispatch => ({
            action: bindActionCreators(ObjectAction, dispatch),
            modalaction: bindActionCreators(ModalAction,dispatch),
            formaction: bindActionCreators(FormAction,dispatch),
        })

        const Results = connect(mapStateToProps,mapDispatchToProps)(ApiObjectListContainer)

        return <Route path={this.props.path} component={Results} />
    }
}


export default ApiRoute