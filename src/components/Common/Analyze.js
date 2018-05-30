import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ModalAction from '../../action/ModalAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import id_field from '../form_fields/id_field';
import Name_field from '../form_fields/Name_field';
import Email_field from '../form_fields/Email_field';
import Comment_field from '../form_fields/Comment_field';
import Number_field from '../form_fields/Number_field';
import User_id_field from '../form_fields/User_id_field';


class Analyze extends React.Component {    
    
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.modalaction.getAnalyzeAction(false);
    }

    render_field(col_name,i){
        if(col_name === 'Name')
            return <Name_field key={i} valid={true} value={this.props.formdata.Name}/>
        
        if(col_name === 'Email')
            return <Email_field key={i} valid={true} value={this.props.formdata.Email}/>
        
        if(col_name === 'Comment')
            return <Comment_field key={i} valid={true} value={this.props.formdata.Comment}/>
    
        if(col_name === 'Number')
            return <Number_field key={i} valid={true} value={this.props.formdata.Number}/>

        if(col_name === 'User_id')
            return <User_id_field key={i} valid={true} value={this.props.formdata.User_id}/>
    }

    render() {
        return (
            <Modal isOpen={this.props.modalview} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.ModalTitle}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="id">id</Label>
                        <Input value = {this.props.formdata.id} />
                    </FormGroup>
                    <Form>
                        {this.props.column_names.map((col_name,i) => 
                            this.render_field(col_name,i)
                        )}  
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({
    modalview: state.analyzeReducer.showmodal,
    formdata: state.selectedUserReducer.data,
});

const mapDispatchToProps = dispatch => ({
    modalaction: bindActionCreators(ModalAction,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Analyze);






