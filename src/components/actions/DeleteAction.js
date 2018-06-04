import React from 'react';
import { Button } from 'reactstrap';
import BaseAction from './BaseAction'
import toastr from 'toastr';

class DeleteAction extends BaseAction{  
    constructor(){
        super()
    }

    onClick(){
        let parent = this.props.parent
        parent.setState({ModalTitle: 'Delete'});
        if(parent.state.selectedId!='No'){
            parent.props.action.deleteAction(parent.props.objectKey, parent.state.selectedId)
                .then(()=>{
                    toastr.warning('Deleted');
                });
                parent.state.selectedId = 'No';
        }
    }

    render(){
        return <Button color = "danger"
                    onClick={this.onClick}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"/> Delete
                </Button>
    }
}

export default DeleteAction;