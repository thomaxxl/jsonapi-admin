import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import id_field from '../form_fields/id_field';
import Name_field from '../form_fields/Name_field';
import Email_field from '../form_fields/Email_field';
import Comment_field from '../form_fields/Comment_field';
import Number_field from '../form_fields/Number_field';
import User_id_field from '../form_fields/User_id_field';
import * as ModalAction from '../../action/ModalAction';
import * as UserAction from '../../action/UserAction';
import * as FormAction from '../../action/FormAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';


class DModal extends React.Component {    
    
    constructor() {
        super();
        this.state = {
            inputid: "",
            inputName: "",
            inputEmail: "",
            inputComment: "",
            inputNumber: "1",
            inputUser_id:"",
            vEmail: true,
            vName:true,
            vComment:true,
            vUser_id:true
        };
        this.toggle = this.toggle.bind(this);
        this.Submit = this.Submit.bind(this);
    }

    validateField(fieldName, value) {
        // let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let result = true;
        // let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            this.state.vEmail = emailValid ? true : false;
            if(!value.length) this.state.vEmail=true;
            break;
          case 'name':
            this.state.vName = value.length >= 2 || value.length == 0;
            break;
          case 'comment':
            this.state.vComment = value.length >= 6 || value.length == 0;
            break;
          case 'user_id':
            this.setState.vUser_id = true;
          default:
            break;
        }
      }
      
    changeid(event) {
        this.setState({inputid: event.target.value})
        this.props.formaction.getFormAction(false);
    }

    changeUser_id(event) {
        this.setState({inputUser_id: event.target.value})
        this.props.formaction.getFormAction(false);
    }

    changeName(event){
        this.setState({inputName: event.target.value});
        this.validateField('name',event.target.value);
        this.props.formaction.getFormAction(false);
    }

    changeEmail(event){
        this.setState({inputEmail: event.target.value});
        this.validateField('email',event.target.value);
        this.props.formaction.getFormAction(false);
    }

    changeComment(event){
        this.setState({inputComment: event.target.value});
        this.validateField('comment',event.target.value);
        this.props.formaction.getFormAction(false);
    }

    async changeNumber(event){
        // this.state.inputNumber = event.target.value;
        this.setState({inputNumber: event.target.value});
        this.props.formaction.getFormAction(false);
    }

    toggle() {
        this.props.modalaction.getModalAction(false);
    }

    Submit(){
        this.props.modalaction.getModalAction(false);
        let post = {
            // 'id': this.state.inputid,
            'Name': this.state.inputName,
            'Email': this.state.inputEmail,
            'Comment': this.state.inputComment,
            'Number': this.state.inputNumber,
            'User_id': this.state.inputUser_id
        }
        if(this.props.ModalTitle === 'Edit'){
            post = {
                'id': this.state.inputid,
                'Name': this.state.inputName,
                'Email': this.state.inputEmail,
                'Comment': this.state.inputComment,
                'Number': this.state.inputNumber,
                'User_id': this.state.inputUser_id
            }
        }
        this.props.action.saveAction(post)
            .then(()=>{
                if(this.props.ModalTitle === 'Edit')toastr.success('Edited');
                else toastr.success('Saved');
            });
    }
 
    render_field(col_name, i){
        if(this.props.forminitial == true){
            this.state.inputid = "";
            this.state.inputName = "";
            this.state.inputEmail = "";
            this.state.inputComment = "";
            this.state.inputNumber = "1";  
            this.state.inputUser_id = "";     
            if(this.props.ModalTitle==='Edit'){
                this.state.inputid = this.props.formdata.id;
                this.state.inputName = this.props.formdata.Name;
                this.state.inputEmail = this.props.formdata.Email;
                this.state.inputComment = this.props.formdata.Comment;
                this.state.inputNumber = this.props.formdata.Number;
                this.state.inputUser_id = this.props.formdata.User_id;
            }
        }
        if(col_name === 'id')
            return <id_field key={i} placeholder={this.state.inputid} onChange={this.changeid.bind(this)}/>
    
        if(col_name === 'Name')
            return <Name_field key={i} valid={this.state.vName} placeholder={this.state.inputName} onChange={this.changeName.bind(this)}/>
        
        if(col_name === 'Email')
            return <Email_field key={i} valid={this.state.vEmail} placeholder={this.state.inputEmail} onChange={this.changeEmail.bind(this)}/>
        
        if(col_name === 'Comment')
            return <Comment_field key={i} valid={this.state.vComment} placeholder={this.state.inputComment} onChange={this.changeComment.bind(this)}/>
        
        if(col_name === 'Number')
            return <Number_field key={i} value={this.state.inputNumber} onChange={this.changeNumber.bind(this)}/>

        if(col_name === 'User_id')
            return <User_id_field key={i} value={this.state.inputUser_id} onChange={this.changeUser_id.bind(this)}/>
    }
    
    render() {
        return (
            <Modal isOpen={this.props.modalview} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.ModalTitle}</ModalHeader>
                <ModalBody>
                    <Form>
                        {this.props.column_names.map((col_name,i) => 
                            this.render_field(col_name,i)
                        )}  
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
});

const mapDispatchToProps = dispatch => ({
    modalaction: bindActionCreators(ModalAction,dispatch),
    formaction: bindActionCreators(FormAction,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(DModal);
