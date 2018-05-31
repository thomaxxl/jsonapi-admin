import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Param from '.././Config';

export const HeaderNavContainer = () => {
    return (
        <nav className="navbar navbar-toggleable-sm bg-info navbar-inverse">
            <div className="container">
                <button className="navbar-toggler" data-toggle="collapse" data-target="#mainNav">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mainNav">
                    <div className="navbar-nav">
                        <h4><NavLink className="nav-item nav-link" exact activeClassName="active" to="/">Home</NavLink></h4>
                        {
                        Object.keys(Param.APP).map(function(key, index) {
                            return (<h4 key = {index}>
                                <NavLink className="nav-item nav-link" activeClassName="active" to={Param.APP [key].path} >
                                    {Param.APP [key].menu}
                                </NavLink>
                            </h4>);
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavContainer;