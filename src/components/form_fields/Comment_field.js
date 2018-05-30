import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';

class Comment_field extends React.Component {  
    constructor(){
        super()
    }
    render_error(){
        if(!this.props.valid)
            return  <Alert color="danger">
                        Comment length must be at least 6!
                    </Alert>
        else return ''; 
    }
    render(){
        return <FormGroup  key={this.props.key}>
                    <Label for="Comment">Comment</Label>
                    <Input value={this.props.value}type="textarea" name="comment" placeholder= {this.props.placeholder} onChange={this.props.onChange}/>
                    {this.render_error()}   
                </FormGroup>
    }
}

export default Comment_field;