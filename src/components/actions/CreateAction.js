import React from 'react';
import BaseAction from './BaseAction'
import { Button } from 'reactstrap';

class CreateAction extends BaseAction {
    constructor(props){
        super(props)
    }

    onClick(){
        let parent = this.props.parent;
        parent.setState({ModalTitle: 'New'});
        //parent.props.modalaction.getModalAction(true);
        //parent.props.formaction.getFormAction(true);
    }

    render(){
        return <Button color = "primary"
                    onClick={this.onClick}
                >
                    <i className="fa fa-plus" aria-hidden="true"/> New
                </Button>
    }
}

export default CreateAction;