import React from 'react';
import { connect } from 'react-redux';
import * as Param from '../Config';
import {Config} from '../Config'
import {NavLink as RRNavLink} from 'react-router-dom';
import * as InputAction from '../action/InputAction'
import {bindActionCreators} from 'redux'
import {Login} from './Common/Login'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  InputGroup,
  InputGroupAddon,
  Input,
  DropdownItem } from 'reactstrap';

import Cookies from 'universal-cookie';
import './style/navstyle.css'



class HeaderNavContainer extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)

        const cookies = new Cookies()
        let language = cookies.get('language')
        language = language ? language : 'En'
        cookies.set('language', language)
        this.state = {
          isOpen: false,
          language : language
        }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }

    change_url(e){
        let api_url = e.target.value
        this.props.inputaction.getUrlAction(e.target.value);
        localStorage.setItem('url',api_url);
        const cookies = new Cookies()
        cookies.set('api_url', api_url)
    }

    setLanguage() {
        const cookies = new Cookies()
        let language = this.state.language
        if(language === 'En'){
            language = 'Fr'
        }
        else if (language === 'Nl'){
            language = 'En'
        }
        else if (language === 'Fr'){
            language = 'Nl'
        }
        cookies.set('language', language)
        this.setState({ language : language})
    }

    render() {
        var currentPath = this.props.currentPath
        var navTitle = Config.title ? Config.title : 'J:A'
        var INPUT = (<InputGroup className="Left">
                      <InputGroupAddon addonType="prepend">{this.props.inputflag.url===''?Param.URL:this.props.inputflag.url}</InputGroupAddon>
                    </InputGroup>)
        if(this.props.inputflag.flag){
          INPUT =     (<InputGroup className="Left">
                        <InputGroupAddon addonType="prepend">BACK-END-URL</InputGroupAddon>
                        <Input placeholder={this.props.inputflag.url===''?Param.URL:this.props.inputflag.url} onChange={this.change_url.bind(this)}/>
                      </InputGroup>)
        }

        if(Config.disable_api_url){
             INPUT = ''
        }

        const login = Config.enable_login ?  <Login ref={this.login} logged_in={false}/> : 'Login'
        
        return (
         <div>
            <Navbar color="faded" light expand="md" className="navbar-dark navbar-inverse bg-dark">
            <NavbarBrand replace tag={RRNavLink} to="/" >{navTitle}</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  {
                    Object.keys(Param.APP).map(function(key, index){
                        if(Param.APP[key].hidden) {
                            return <span key={index}/>
                        }
                        return (<NavItem key = {index}>
                                  <NavLink replace activeClassName="active" tag={RRNavLink} to={Param.APP[key].path} >
                                      {Param.APP[key].menu}
                                  </NavLink>
                                </NavItem>)
                    })
                  }
                </Nav>
                {INPUT}
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="">{login}</NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {/* <FontAwesomeIcon icon={faCog}></FontAwesomeIcon> */}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                         <a href="/admin">Admin</a>
                      </DropdownItem>
                      <DropdownItem>
                        <a href="/api">API</a>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <span onClick={this.setLanguage.bind(this)} className="langspan">Fr</span> 
                        <span onClick={this.setLanguage.bind(this)} className="langspan">Nl</span>
                        <span onClick={this.setLanguage.bind(this)} className="langspan">De</span>
                        <span onClick={this.setLanguage.bind(this)} className="langspan current">En</span>
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

const mapStateToProps = state => ({
  api_data: state.object,
  inputflag: state.inputReducer
})

const mapDispatchToProps = dispatch => ({
  inputaction: bindActionCreators(InputAction,dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(HeaderNavContainer);