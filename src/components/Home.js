import React, { PropTypes } from 'react';

import * as Param from '../Config'

const Home = () => {
    return (
        <div>
            <header>
                <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
                    <div className="container">
                        <h1 className="display-4">JsonApi-Admin</h1>
                        <p className="lead">React Redux JSON:API CRUD Admin Interface</p>
                    </div>
                </div>
            </header>
            <div className="container">
                <h2>API BaseUrl</h2>
                <a href={Param.URL}>{Param.URL}</a>
                <h2>UI Config</h2>
                <pre>
                {JSON.stringify(Param.APP, null, 2)}
                </pre>
            </div>
        </div>
    );
};



export default Home;