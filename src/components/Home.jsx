import React from 'react';
import { connect } from 'react-redux'
import * as Param from '../Config'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render(){
        return (
            <div>
                <header>
                    <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
                        <div className="container">
                            <h1 className="display-4">jsonapi-admin UI</h1>
                            React+redux js frontend for a jsonapi backend
                        </div>
                    </div>
                </header>
                <div className="container">
                    <ul>
                        <li>
                            <a href="https://github.com/thomaxxl/jsonapi-admin">Github</a>
                        </li>
                        <li>This webapp implements CRUD operations on the jsonapi at <a href={this.props.inputflag.url}>{this.props.inputflag.url}</a>. The interface is generated from the swagger configuration (json) of <a href={this.props.inputflag.url}>{this.props.inputflag.url}</a> </li>
                        <li>UI Configuration ( Genrated by the <Link to="/admin">admin interface)</Link> ):
                            <pre>{JSON.stringify(Param.APP,null,2)}</pre>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    inputflag: state.inputReducer
})

// let exported = Param.Home ? Param.Home : Home
let exported = Home

export default connect(mapStateToProps)(exported);
