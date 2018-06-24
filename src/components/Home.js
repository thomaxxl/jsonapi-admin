import React, { PropTypes } from 'react';
import * as Param from '../Config'
import APP from '../Config.json';

const Home = () => {

    console.log('hom',Param)
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
                    <li>This framework implements CRUD operations on the jsonapi at {Param.URL} </li>
                    <li>UI Configuration:
                        <pre>{JSON.stringify(APP,null,2)}</pre>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;