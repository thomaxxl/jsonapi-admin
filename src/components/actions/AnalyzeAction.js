import React from 'react';
import BaseAction from './BaseAction'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { faCog, faTrashAlt, faCoffee, faBullseye, faPlay, faSearchEngin, faEdit, faInfo  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import toastr from 'toastr'

class AnalyzeModal extends React.Component {    
    
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
                    <pre>{JSON.stringify(this.props.selectedItem)}</pre>
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
        console.log(parent.props)
        let selected_item = parent.getSelectedItem()

        if(parent.state.selectedId === null){
            toastr.error('No ID')
        }
        else
        {
            let modal = <AnalyzeModal selectedItem={selected_item}
                                    objectKey={this.props.objectKey}/>
            parent.setState({modal: modal})
        }
    }

    render(){
        return <Button color="black" onClick={this.onClick} >
                    <span ><FontAwesomeIcon className="fa-fw" icon={faPlay}></FontAwesomeIcon>Analyze</span>
                </Button>
    }   
}

export default AnalyzeAction;