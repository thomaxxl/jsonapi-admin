import React from 'react';
import { connect } from 'react-redux'
import {APP, api_config} from '../Config.jsx'
import {ui_config} from '../Config.jsx'
import {Disco} from '../disco/disco.jsx'

class DefaultHome extends React.Component {

    render(){
        const disco = this.props.url ? <Disco api_root={this.props.url}/> : ""
        return [ <header>
                    <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
                        <div className="container">
                            <h1 className="display-4">jsonapi-admin UI</h1>
                            React+redux js frontend for a jsonapi backend
                        </div>
                    </div>
                </header>,
                <div className="container">
                    <ul>
                        <li>This framework implements CRUD operations on the jsonapi at <a href={this.props.url}>{this.props.url}</a> </li>
                        
                        <li>UI Configuration {disco}
                            <pre>{JSON.stringify(APP,null,2)}</pre>
                        </li>
                    </ul>
                </div> ]
                
    }
}


class Home extends React.Component {

    render(){
        let home = ui_config.home ? ui_config.home : <DefaultHome url={this.props.inputflag.url ? this.props.inputflag.url : api_config.baseUrl } />
        return (
            <div>
                {home}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    inputflag: state.inputReducer
})

let exported = Home

export default connect(mapStateToProps)(exported);
