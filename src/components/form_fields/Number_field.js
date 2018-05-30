import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Number_field extends React.Component {  
    constructor(){
        super()
    }

    render(){
        return <FormGroup  key={this.props.key}>
                    <Label for="exampleSelect">Select Number</Label>
                    <Input value = {this.props.value} type="select" name="select" id="exampleSelect" onChange={this.props.onChange}>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </Input>
                </FormGroup>
    }
}

export default Number_field;