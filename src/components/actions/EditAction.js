import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import BaseAction from './BaseAction'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Field from '../fields/Field';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Config from '../../Config'
import toastr from 'toastr'
import { faPencilAlt  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as ObjectAction from '../../action/ObjectAction'
import * as ModalAction from '../../action/ModalAction'


class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        this.toggle = this.toggle.bind(this)
        this.show = this.show.bind(this)
        this.submit = this.submit.bind(this)
        this.renderAttributes = this.renderAttributes.bind(this)
    }

    toggle() {
        this.props.modalaction.getModalAction(false)
    }

    show(){
        this.setState({
            visible: true
        })   
    }

    submit() {
        var post = {};
        post.id = this.props.selectedId;
        Config.APP [this.props.objectKey].column.map(function(item, index) {
            post [item.text] = this.state [item.text] != undefined 
                            ? this.state [item.text] 
                            : this.props.formdata.attributes [item.dataField];
        }, this);
        this.props.modalaction.getModalAction(false)

        var offset = this.props.datas [this.props.objectKey].offset;
        var limit = this.props.datas [this.props.objectKey].limit;

        this.props.action.saveAction(this.props.objectKey, post, offset, limit)
            .then(()=>{
                toastr.success('Saved', '', {positionClass: "toast-top-center"});
            });
    }

    renderAttributes(){
        let data = this.props.formdata.attributes;
        return <Form>
                    { Config.APP[this.props.objectKey].column.map(function(item, index) {
                            return (<Field 
                                    key={index} 
                                    column={item} 
                                    placeholder={ (data == undefined || data [item.dataField] == "") 
                                            ? item.placeholder : data [item.dataField] }
                                    onChange={(event) => {
                                        this.state[item.text] = event.target.value}}/>)
                        }, this)
                      }
                </Form>        
    }

    render() {
        let attributes = this.renderAttributes()

        return  <Modal isOpen={this.props.modalview} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        {attributes}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
    }
}


class EditAction extends BaseAction {  
    
    constructor(props){
        super(props)
    }

    onClick(){  

        let parent = this.props.parent;
        
        if(parent.state.selectedIds.length == 1)
        {
            parent.props.modalaction.getModalAction(true)

            parent.props.action.getSingleAction(parent.props.objectKey, parent.state.selectedIds[0]);
            
            const mapStateToProps = state => ({
                modalview: state.modalReducer.showmodal,
                formdata: state.selectedReducer,
                datas: state.object
            }); 
            const mapDispatchToProps = dispatch => ({
                action: bindActionCreators(ObjectAction, dispatch),
                modalaction: bindActionCreators(ModalAction,dispatch),
            })

            let EditModalWithConnect = connect(mapStateToProps, mapDispatchToProps)( EditModal);

            var modal = <EditModalWithConnect objectKey={this.props.objectKey} 
                                selectedId={parent.state.selectedIds [0]} 
                                />
            parent.setState({modal: modal})
        }
        else if(parent.state.selectedIds.length > 1)
            toastr.error('More than two Items are Selected', '', {positionClass: "toast-top-center"});
        else {
            toastr.error('No Item Selected', '', {positionClass: "toast-top-center"});
        }
    }

    render(){
        return <Button color = "success"
                    onClick={this.onClick}           
                >
                    <span><FontAwesomeIcon className="fa-fw" icon={faPencilAlt}></FontAwesomeIcon>Edit</span>
                </Button>
    }
}

export default EditAction;