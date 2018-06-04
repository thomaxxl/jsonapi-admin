import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'reactstrap';
import List from '../Common/List';
import Analyze from '../Common/Analyze';
import * as Param from '../../Config';
import { Route } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert'

class ApiObjectListContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectedId: null,
            ModalTitle: 'undefined',
            modal : null,
        }
    }

    handleRowSelect(row, isSelected) {

        if (isSelected) {
            this.setState({selectedId: row.id});
        }
        else {
            this.setState({selectedId: null});
        }
    }

    componentDidMount() {
        this.props.action.getAction(this.props.objectKey)
            .catch(error => {
                toastr.error(error);
            });
    }

    render() {

        
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>{this.props.item.Title}</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            {this.props.item.actions.map((Action, index) => 
                                <Action key={index} 
                                        objectKey={this.props.objectKey}
                                        parent={this} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <List data={this.props.datas [this.props.objectKey]} 
                              handleRowSelect={this.handleRowSelect.bind(this)} 
                              columns={this.props.item.column}/>
                    </div>
                </div>
                {this.state.modal}
            </div>
        );
    }
}

export default ApiObjectListContainer