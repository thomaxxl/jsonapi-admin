import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class User_id_field extends React.Component {  
    constructor(){
        super()
    }

    render(){
        return <FormGroup key={this.props.key}>
                    <Label for="id">User id</Label>
                    <Input value={this.props.value} type="name" name="id" placeholder= {this.props.placeholder} onChange={this.props.onChange}/>
                </FormGroup>
    }
}

export default User_id_field;