import React from 'react';
import { Button } from 'reactstrap';

class DeleteAction extends React.Component {  
    constructor(){
        super()
    }

    render(){
        return <Button color = "danger"
                    onClick={this.props.onClick}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"/> Delete
                </Button>
    }
}

export default DeleteAction;