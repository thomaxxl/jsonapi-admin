import React from 'react';
import BaseAction from './BaseAction'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { faCog, faTrashAlt, faCoffee, faBullseye, faPlay, faSearchEngin, faEdit, faInfo  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import toastr from 'toastr'

class Analyze extends React.Component {    
    
    constructor() {
        super()
        this.state = {
          modalview: true
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({modalview : !this.state.modalview })
    }

    render() {
        return (
            <Modal isOpen={this.state.modalview} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Analyze</ModalHeader>
                <ModalBody>
                    <div>{this.props.selectedId}</div>
                </ModalBody>
            </Modal>
        )
    }
}


class AnalyzeAction extends BaseAction { 

    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        let parent = this.props.parent
        
        if(parent.state.selectedId === null){
            toastr.error('No ID')
        }
        else
        {
            let modal = <Analyze selectedId={parent.state.selectedId}
                                    objectKey={this.props.objectKey}/>
            parent.setState({modal: modal})
        }
    }

    render(){
        return <Button color = "blue" onClick={this.onClick} >
                    <span ><FontAwesomeIcon className="fa-fw" icon={faPlay}></FontAwesomeIcon>Analyze</span>
                </Button>
    }   
}

export default AnalyzeAction;