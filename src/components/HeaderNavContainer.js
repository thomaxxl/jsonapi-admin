import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Param from '.././Config';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  MenuItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { faCog, faTrashAlt, faCoffee, faBullseye, faPlay, faSearchEngin  } from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './style.css'
class HeaderNavContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
     <div>
        <Navbar color="faded" light expand="md" className="navbar-dark navbar-inverse bg-dark">
        <NavbarBrand href="/">C&C</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {
                Object.keys(Param.APP).map(function(key, index) {
                    return (<NavItem key = {index}>
                        <NavLink href={Param.APP [key].path} >
                            {Param.APP [key].menu}
                        </NavLink>
                    </NavItem>)
                })
              }
            </Nav>

            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="">Admin</NavLink>
              </NavItem>
               <NavItem>
                <NavLink href="">API</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                     Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>

        </Navbar>
      </div>
    )
  }
}

export default HeaderNavContainer;