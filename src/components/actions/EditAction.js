import React from 'react';
import { Button } from 'reactstrap';

import { faCog, faTrashAlt, faCoffee, faBullseye, faPlay, faSearchEngin, faEdit, faInfo  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class JSAAIcon extends React.Component{

    render(){
        return <span ><FontAwesomeIcon className="fa-fw" icon={faEdit} ></FontAwesomeIcon></span>
    }
}


class EditAction extends React.Component {  


    constructor(props){
        super(props)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){

        alert('TODO')
        console.log(this.props.parent)
        this.props.parent.setState({ModalTitle: 'Edit'});
        if(this.props.parent.state.selectedId!='No')
        {
            this.props.parent.props.action.getSingleAction(this.state.selectedId);
            this.props.parent.props.modalaction.getModalAction(true);
            this.props.parent.props.formaction.getFormAction(true);
        }
    }

    render(){

        return <Button color = "success"
                    onClick={this.handleEdit}
                    key = {this.props.key}                     
                >
                    <JSAAIcon /> Edit
                </Button>
    }
}

export default EditAction;