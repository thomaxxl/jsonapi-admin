import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';

class Name_field extends React.Component {  
    constructor(){
        super()
    }
    render_error(){
        if(!this.props.valid)
            return  <Alert color="danger">
                        Name length must be at least 2!
                    </Alert>
        else return '';
        
    }

    render(){
        return <FormGroup  key={this.props.key}>
                    <Label for="name">Name</Label>
                    <Input value={this.props.value} type="name" name="name" placeholder= {this.props.placeholder} onChange={this.props.onChange}/>
                    {this.render_error()}
                </FormGroup>
    }
}

export default Name_field;