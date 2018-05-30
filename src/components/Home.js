import React, { PropTypes } from 'react';
import reactjs from '../img/reactjs.jpg';
import createReactApp from '../img/createReactApp.jpg';
import reactrouter4 from '../img/reactrouter4.jpg';
import bootstrap4 from '../img/bootstrap4.jpg';

const Home = () => {
    return (
        <div>
            
            <header>
                <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
                    <div className="container">
                        <h1 className="display-4">React Redux Flask Admin</h1>
                        <p className="lead">with mock backend</p>
                    </div>
                </div>
            </header>

            <div className="container text-muted">
                <section className="row">
                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <a href="https://facebook.github.io/react" target="_blank">
                                <img src={reactjs} className="card-img-top img-fluid" alt="ReactJS"/>
                            </a>
                            <div className="card-block">
                                <h3 className="card-title">ReactJS</h3>
                                <p>ReactJS/Redux using the ES2015 (ES6) syntax.</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <a href="https://github.com/facebookincubator/create-react-app" target="_blank">
                                <img src={createReactApp} className="card-img-top img-fluid" alt="Create React App"/>
                            </a>
                            <div className="card-block">
                                <h3 className="card-title">create-react-app</h3>
                                <p>Official. No Setup. Built in HMR, ESLint, Jest, Coverage</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <a href="https://reacttraining.com/react-router" target="_blank">
                                <img src={reactrouter4} className="card-img-top img-fluid" alt="React Router 4"/>
                            </a>
                            <div className="card-block">
                                <h3 className="card-title">Flask Admin</h3>
                                <p>React Redux Flask Admin</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <a href="http://v4-alpha.getbootstrap.com" target="_blank">
                            <img src={bootstrap4} className="card-img-top img-fluid" alt="Bootstrap 4" />
                            </a>
                            <div className="card-block">
                                <h3 className="card-title">Bootstrap 4</h3>
                                <p>A framework for styling apps for all screen sizes.</p>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            
        </div>
    );
};



export default Home;