import React from 'react';
import { Button } from 'reactstrap';
import BaseAction from './BaseAction'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Field from '../fields/Field';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Config from '../../Config'
import toastr from 'toastr'
import { faPencilAlt  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        this.toggle = this.toggle.bind(this)
        this.show = this.show.bind(this)
        this.renderAttributes = this.renderAttributes.bind(this)
        console.log('constr')
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    show(){
        this.setState({
            visible: true
        })   
    }

    renderAttributes(){

        return <Form>
                    { Config.APP[this.props.objectKey].column.map(function(item, index) {
                            return (<Field 
                                    key={index} 
                                    column={item} 
                                    placeholder={'TODO ' + item.name} //{this.props.formdata [item.name]}
                                    onChange={(event) => {
                                        this.state[item.name] = event.target.value}}/>)
                        }, this)
                      }
                </Form>        
    }

    render() {

        let attributes = this.renderAttributes()

        return  <Modal isOpen={this.state.visible} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        {attributes}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
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

        let parent = this.props.parent
        if(parent.state.selectedId != null)
        {
            //parent.props.modalaction.getAnalyzeAction(true);
            var modal = <EditModal objectKey={this.props.objectKey} selectedId={parent.state.selectedId} />
            parent.setState({modal: modal})
            // TODO
            //parent.props.action.getSingleAction(parent.props.objectKey, parent.state.selectedId);
            //parent.props.modalaction.getModalAction(true);
            //parent.props.formaction.getFormAction(true);
        }
        else {
            toastr.error('No Item Selected');
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