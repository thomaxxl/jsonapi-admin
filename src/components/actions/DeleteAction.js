import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import BaseAction from './BaseAction'
import toastr from 'toastr';

class DeleteAction extends BaseAction{  
    constructor(){
        super()
    }

    onClick(){
        let parent = this.props.parent
        parent.setState({ModalTitle: 'Delete'});
        if(parent.state.selectedIds.length != 0){
            if (!confirm("Do you want to delete selected items?"))  return;
            
            var offset = this.props.datas [this.props.objectKey].offset;
            var limit = this.props.datas [this.props.objectKey].limit;
            parent.props.action.deleteAction(parent.props.objectKey, parent.state.selectedIds, offset, limit)
                .then(()=>{
                    toastr.warning('Deleted', '', {positionClass: "toast-top-center"});
                });
                parent.state.selectedIds = [];
        }
    }

    render(){
        return <Button color = "danger"
                    onClick={this.onClick}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"/> Delete
                </Button>
    }
}

const mapStateToProps = state => ({
    datas: state.object
}); 
export default connect(mapStateToProps)( DeleteAction);