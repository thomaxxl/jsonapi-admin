import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class id_field extends React.Component {  
    constructor(){
        super()
    }

    render(){
        return <FormGroup key={this.props.key}>
                    <Label for="id">id</Label>
                    <Input value={this.props.value} type="name" name="id" placeholder= {this.props.placeholder} onChange={this.props.onChange}/>
                </FormGroup>
    }
}

export default id_field;