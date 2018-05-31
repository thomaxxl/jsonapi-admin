import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ModalAction from '../../action/ModalAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';


import * as Param from '../../Config';
import Field from '../fields/Field';



class Analyze extends React.Component {    
    
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.modalaction.getAnalyzeAction(false);
    }

    render() {
        console.log("analyze");
        console.log(this.props.formdata);
        return (
            <Modal isOpen={this.props.modalview} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.ModalTitle}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="id">id</Label>
                        <Input value = {this.props.formdata.id} />
                    </FormGroup>
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
            </Modal>
        );
    }
};

const mapStateToProps = state => ({
    modalview: state.analyzeReducer.showmodal,
    formdata: state.selectedReducer,
});

const mapDispatchToProps = dispatch => ({
    modalaction: bindActionCreators(ModalAction,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Analyze);






