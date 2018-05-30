import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Param from '.././config_ui';


// TODO: use the App_structure items (not the "menu" )
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
                        {Param.App_structure.Menu.map((menu,i) =>
                            <h4 key = {i}><NavLink className="nav-item nav-link" activeClassName="active" to={menu} >{menu}</NavLink></h4>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavContainer;