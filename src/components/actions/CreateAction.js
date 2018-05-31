import React from 'react';
import { Button } from 'reactstrap';

class CreateAction extends React.Component {
    constructor(){
        super()
    }

    render(){
        return <Button color = "primary"
                    onClick={this.props.onClick}
                >
                    <i className="fa fa-plus" aria-hidden="true"/> New
                </Button>
    }
}

export default CreateAction;