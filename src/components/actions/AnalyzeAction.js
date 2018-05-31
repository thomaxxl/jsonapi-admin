import React from 'react';
import { Button } from 'reactstrap';

class AnalyzeAction extends React.Component { 
    constructor(){
        super()
    }

    render(){
        return <Button color = "info"
                    onClick={this.props.onClick}
                >
                    <i className="fa fa-pencil" aria-hidden="true"/> Analyze
                </Button>
    }
}

export default AnalyzeAction;