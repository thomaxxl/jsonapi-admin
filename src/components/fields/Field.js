import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';

class Field extends React.Component {  
    constructor(){
        super()
    }

    render(){
        var item = this.props.column;
        return <FormGroup>
                    <Label for="name">{item.name}</Label>
                    <Input value={this.props.value}
                            type={item.type}
                            name={item.api}
                            placeholder= {this.props.placeholder != undefined ? this.props.placeholder : item.placeholder}
                            onChange={this.props.onChange}/>
                </FormGroup>
    }
}

export default Field;