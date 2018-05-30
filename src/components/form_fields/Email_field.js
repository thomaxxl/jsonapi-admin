import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';


class Email_field extends React.Component {  
    constructor(){
        super()
    }

    render_error(){
        if(!this.props.valid)
            return  <Alert color="danger">
                        Input valid email!
                    </Alert>
        else return ''; 
    }
    render(){
        return <FormGroup  key={this.props.key}>
                    <Label for="Email">Email</Label>
                    <Input value={this.props.value} type="email" name="email" placeholder= {this.props.placeholder} onChange={this.props.onChange}/>
                    {this.render_error()}
                </FormGroup>
    }
}

export default Email_field;