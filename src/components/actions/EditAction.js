import React from 'react';
import { Button } from 'reactstrap';

class EditAction extends React.Component {  
    constructor(){
        super()
    }

    render(){
        return <Button color = "success"
                    onClick={this.props.onClick}           
                >
                    <i className="fa fa-pencil" aria-hidden="true"/> Edit
                </Button>
    }
}

export default EditAction;