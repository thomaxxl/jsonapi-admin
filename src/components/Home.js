import React from 'react';
import { connect } from 'react-redux'
import * as Param from '../Config'
import {Config} from '../Config'

class DefaultHome extends React.Component {

    render(){
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
                        <li>
                            <a href="https://github.com/thomaxxl/jsonapi-admin">Github</a>
                        </li>
                        <li>This framework implements CRUD operations on the jsonapi at <a href={this.props.url}>{this.props.url}</a> </li>
                        <li>UI Configuration:
                            <pre>{JSON.stringify(Param.APP,null,2)}</pre>
                        </li>
                    </ul>
                </div> ]
                
    }
}


class Home extends React.Component {

    render(){
        let home = Config.home ? Config.home : <DefaultHome url={this.props.inputflag.url} />
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
