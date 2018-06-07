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
                    <Label for="name">{item.text}</Label>
                    <Input value={this.props.value}
                            type={item.type}
                            disabled={this.props.disabled}
                            name={item.dataField}
                            placeholder= {this.props.placeholder != undefined && this.props.disabled == undefined? this.props.placeholder : ''}
                            onChange={this.props.onChange}/>
                </FormGroup>
    }
}

export default Field;