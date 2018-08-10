import React from 'react';
import { connect } from 'react-redux'
import * as Param from '../../Config'
import { bindActionCreators } from 'redux'
import * as ObjectAction from '../../action/ObjectAction'

class Fetcher extends React.Component {

    constructor(props) {
        super(props)
        let offset = 0;
        let limit = 1
        this.props.action.getAction(this.props.objectKey, offset, limit)
   }

   jA2Html(){

   }

   render(){
        const ok_data = this.props.api_data[this.props.objectKey]
        const sample = ok_data.data ? ok_data.data[0] : ''

        if(sample){
                return <div>
                            <h2>{this.props.objectKey}</h2>
                            {sample.render()}
                            {sample.render_config()}
                        </div>
        }
        
        return <div/>
   }
}

class Admin extends React.Component {
    constructor(props) {
         super(props)
         this.state = {
             endpoints : []
         }
    }

    fetch(objectKey){
        const mapStateToProps = state => ({
            objectKey: objectKey,
            item: Param.APP[objectKey],
            api_data: state.object,
        })
        
        const mapDispatchToProps = dispatch => ({
            action: bindActionCreators(ObjectAction, dispatch)
        })

        const Fetched = connect(mapStateToProps, mapDispatchToProps)(Fetcher)
        return <Fetched/>
    }

    render(){

        return (
            <div>
                <div className="container">
                {this.fetch('Books')}
                    
                </div>
            </div>
        );
    }
};

export default Admin;
