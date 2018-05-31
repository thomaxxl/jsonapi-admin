import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';


import * as Param from '../../Config';
import Field from '../fields/Field';

import * as ModalAction from '../../action/ModalAction';
import * as ObjectAction from '../../action/ObjectAction';
import * as FormAction from '../../action/FormAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';


class DModal extends React.Component {    
    
    constructor(props) {
        super(props);
        this.state = {
        };

        this.toggle = this.toggle.bind(this);
        this.Submit = this.Submit.bind(this);
    }

    toggle() {
        this.props.modalaction.getModalAction(false);
    }

    Submit(){
        var post = {};
        if(this.props.ModalTitle === 'Edit')
            post.id = this.props.formdata.id;
        
        Param.APP [this.props.objectKey].column.map(function(item, index) {
            post [item.name] = this.state [item.name] != undefined 
                            ? this.state [item.name] 
                            : this.props.formdata [item.name];
        }, this);
        this.props.modalaction.getModalAction(false);

        this.props.action.saveAction(this.props.objectKey, post)
            .then(()=>{
                if(this.props.ModalTitle === 'Edit')
                    toastr.success('Edited');
                else
                    toastr.success('Saved');
            });
    }
    
    render() {
        return (
            <Modal isOpen={this.props.modalview} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.ModalTitle}</ModalHeader>
                <ModalBody>
                    <Form>
                        {
                            Param.APP [this.props.objectKey].column.map(function(item, index) {
                                return (<Field 
                                        key={index} 
                                        column={item} 
                                        placeholder={this.props.formdata [item.name]}
                                        onChange={(event) => {
                                            this.state [item.name] = event.target.value}}/>);
                            }, this)
                        }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={false} onClick={this.Submit}><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</Button>
                    <Button type="button" className="btn btn-default btn-space" onClick={this.toggle}>Cancel</Button>      
                </ModalFooter>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({
    modalview: state.modalReducer.showmodal,
    forminitial: state.formReducer.form,
    formdata: state.selectedReducer,
});

const mapDispatchToProps = dispatch => ({
    modalaction: bindActionCreators(ModalAction,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(DModal);
