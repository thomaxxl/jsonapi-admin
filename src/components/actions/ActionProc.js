import CreateAction from "./CreateAction";
import EditAction from "./EditAction";
import DeleteAction from "./DeleteAction";
import AnalyzeAction from "./AnalyzeAction";

import toastr from 'toastr';

export default {
    CreateAction: (_this) => {
        _this.setState({ModalTitle: 'New'});
        _this.props.modalaction.getModalAction(true);
        _this.props.formaction.getFormAction(true);
    },

    EditAction: (_this) => {
        _this.setState({ModalTitle: 'Edit'});
        if(_this.state.selectedId!='No')
        {
            _this.props.action.getSingleAction(_this.props.objectKey, _this.state.selectedId);
            _this.props.modalaction.getModalAction(true);
            _this.props.formaction.getFormAction(true);
        }
    },

    DeleteAction: (_this) => {
        _this.setState({ModalTitle: 'Delete'});
        if(_this.state.selectedId!='No'){
            _this.props.action.deleteAction(_this.props.objectKey, _this.state.selectedId)
                .then(()=>{
                    toastr.warning('Deleted');
                });
                _this.state.selectedId = 'No';
        }
    },
    
    AnalyzeAction: (_this) => {
        _this.setState({ModalTitle: 'Analyze'});
        if(_this.state.selectedId!='No')
        {
            _this.props.action.getSingleAction(_this.props.objectKey, _this.state.selectedId);
            _this.props.modalaction.getAnalyzeAction(true);
        }
    },
}