import React from 'react';
import { connect } from 'react-redux';
import { APP, api_config, ui_config } from '../Config.jsx'
import { NavLink as RRNavLink } from 'react-router-dom'
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux'
import { PulseLoader as Spinner } from 'react-spinners'
import {Login} from './Common/Login'
import * as InputAction from '../action/InputAction'
import * as SpinnerAction from '../action/SpinnerAction'
import * as ObjectAction from '../action/ObjectAction'
import Cookies from 'universal-cookie'
import toastr from 'toastr'
import {
  Collapse,
  Form,
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
  DropdownItem } from 'reactstrap'
import { faList as faRefresh, faCog } from '@fortawesome/fontawesome-free-solid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  { useState } from 'react';


var oldTimeout = setTimeout;

window.setTimeout = function(callback, timeout) {
  //console.log("timeout started", callback);
  return oldTimeout(function() {
    //console.log('timeout finished', callback);
    callback();
  }, timeout);
}

function setpasswd(passwdwd){
    
}

function sleep(ms) {
    return new Promise(resolve => oldTimeout(resolve, ms));
}


class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {modal: false, setModal: false}
        this.toggle = this.toggle.bind(this)
        this.setpasswd = this.setpasswd.bind(this)
        this.textInput = React.createRef();
        this.setPass = this.setPass.bind(this)
    }
  
    //const [modal, setModal] = useState(false);
    toggle(e){
        this.setState({modal: !this.state.modal}); if(e){e.stopPropagation()}
    }

    setpasswd(e){
        let headers = api_config.configureHeaders();
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        fetch(api_config.baseUrl + '/passwd', {
            method: 'POST',
            headers: headers,
            credentials: 'same-origin',
            body: JSON.stringify({passwdwd: this.state.passwd})
        }).then(function(response) {
            if (!response.ok) {
                response.json().then(function(rsp_json) {
                    toastr.error("Failed to change passwd: " + rsp_json.error)
                });
            }
            else{
                toastr.success("Changed Password")
            }
            
        });
    }

    setPass(e){
        console.log(e.target.value)
        this.setState({passwd:e.target.value})
    }

    render(){

      return (
        <div>
          <span onClick={this.toggle}>Profile</span>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Profile</ModalHeader>
            <ModalBody>
                <Form>
                    
                    <dl>
                        <dt>Username</dt>
                        <dd>{ui_config.username}</dd>

                        <dt>Role</dt>
                        <dd>{ui_config.role}</dd>

                        <dt>E-mail Address</dt>
                        <dd>{ui_config.email}</dd>

                        <dt>Password</dt>
                        <dd><Input ref={this.textInput} type="password" onChange={this.setPass}/></dd>
                    </dl>
                </Form>

            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.setpasswd.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
}

class HeaderNavContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      loading : {}
    }
    this.change_url = this.change_url.bind(this)
    this.refresh_all = this.refresh_all.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  async preload(objectKey, spinner){
    /*
      Retrieve the data from the api
    */

    // don't preload if the 
    const cookies = new Cookies();
    if(! cookies.get('token') ){
        return;
    }
    let loading = this.state.loading
    console.log('preload', objectKey)

    let config  = APP[objectKey]
    if(!config){
        console.warn(`no config for ${objectKey}`)
        return
    }
    if(config.preload === false){
       return
    }

    if(spinner){
      loading[objectKey] = true
      this.setState({ loading : loading})
      this.props.spinnerAction.getSpinnerStart()
    }
    
    let request_args = config.request_args ? config.request_args : {}
    let offset = config.offset ? config.offset : 0
    let limit = config.limit || api_config.limit ? config.limit || api_config.limit: 25
    let getArgs = [ objectKey, offset, limit ]
    //let result = await this.props.action.getAction(...getArgs).then(console.log(`Loaded ${objectKey}`))
    let result = await this.props.action.getAction(...getArgs)
                        .then(console.log(`Loaded ${objectKey}`))
    
    if(spinner){
      delete loading[objectKey]
      this.setState({ loading : loading})
      if(Object.keys(this.state.loading).length === 0){
        this.props.spinnerAction.getSpinnerEnd()
      }
    }
  }

  async refresh_all(){
    let current = Object.keys(APP).find((k) => APP[k].path == this.props.location.pathname)
    this.preload(current, true)
    let preload_list = Object.keys(APP).filter((k) => k != current)
    for (let objectKey of preload_list){
        await sleep(100);
        this.preload(objectKey)
    }
  }

  componentDidMount(){
    
    if (this.props.location.pathname.endsWith('/index')){
        return
    }
    // Refresh all the objects every 5 minutes
    this.interval_api = setInterval(() => this.refresh_all(), 1500000);
  }

  componentWillUnmount() {
    // remove all timeouts

    clearInterval(this.interval_api);
    clearInterval(this.interval_reload);

    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
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

  undoClick(e) {
    e.preventDefault();
  }

  async refresh(e){
    e.stopPropagation()
    let current = Object.keys(APP).find((k) => APP[k].path == this.props.location.pathname)
    this.preload(current, true)
    let preload_list = Object.keys(APP).filter((k) => k != current)
    for (let objectKey of preload_list){   
        await sleep(1000);
        this.preload(objectKey)
    }
  }

  refresh_and_monitor(e){
      this.refresh(e)
  }

  render() {

    var currentStyle = {color:'white'} // todo move to css
    var navTitle = ui_config.NavTitle ? ui_config.NavTitle : 'J:A'
    //var navTitle = 'J:A'
    var INPUT = (<InputGroup className="Left">
                  <InputGroupAddon addonType="prepend">{this.props.inputflag.url===''?api_config.URL:this.props.inputflag.url}</InputGroupAddon>
                </InputGroup>)
    if(this.props.inputflag.flag){
      INPUT =     (<InputGroup className="Left">
                    <InputGroupAddon addonType="prepend">BACK-END-URL</InputGroupAddon>
                    <Input placeholder={this.props.inputflag.url === '' ? api_config.URL : this.props.inputflag.url} onChange={this.change_url.bind(this)}/>
                  </InputGroup>)
    }

    if(ui_config.disable_api_url){
         INPUT = ''
    }

    let login = ui_config.enable_login ?  <Login logged_in={false}/> : 'Login'
    
    const parent = this
    const profile_link = <Profile/>

    let admin_links = <DropdownItem>{profile_link} </DropdownItem>

    if(ui_config.role == "admin"){
        admin_links = [ <DropdownItem key="profile_link">
                           {profile_link}
                        </DropdownItem>,
                        <DropdownItem key="admin_link">
                            <a href={"/admin/"} target="_blank">Admin</a>
                        </DropdownItem>,
                        <DropdownItem key="api_link">
                            <a href={"/api/"} target="_blank">API</a>
                        </DropdownItem>,
                        <DropdownItem key="logout_link">
                          <a href="" onClick={this.undoClick.bind(this)}>{login}</a>
                        </DropdownItem>
                        ]

    }
    else {
          admin_links = [ <DropdownItem key="profile_link">
                             {profile_link}
                          </DropdownItem>,
                          <DropdownItem key="admin_link">
                              <a href={"/admin/"} target="_blank">Admin</a>
                          </DropdownItem>,
                          <DropdownItem key="logout_link">
                            <a href="" onClick={this.undoClick.bind(this)}>{login}</a>
                          </DropdownItem>
                          ]

      
    }

    let current = this.props.location.pathname
    const navbar = this
    const navlinks = Object.keys(APP).map(function(key, index){

                          if(APP[key].hidden === true) {
                              return <span key={index}/>
                          }
                          if(APP[key].hidden == "admin" && api_config.role != "admin") {
                              return <span key={index}/>
                          }
                          let to_link = APP[key].path
                          let classnames="collection_route"
                          if(APP[key].roles){
                              classnames +=  " with_roles"
                          }
                          if(APP[key].path === current){
                              return <NavItem key = {index}>
                                    <NavLink className={classnames} onClick={()=>navbar.preload(key, true)} replace activeClassName="current_nav" tag={RRNavLink} to={to_link} activeStyle={{color:'white'}}>
                                        {APP[key].menu}
                                    </NavLink>
                                  </NavItem>
                          }
                          return <NavItem key = {index}>
                                    <NavLink className={classnames} replace activeClassName="current_nav" tag={RRNavLink} to={to_link} activeStyle={{color:'white'}}>
                                        {APP[key].menu}
                                    </NavLink>
                                  </NavItem>
                          })

    return <div className="ja-headernav">
              <ReactTooltip id="headertt" />
              <Navbar color="faded" light expand="md" className="navbar-dark navbar-inverse bg-dark">
              <NavbarBrand replace tag={RRNavLink} to="/" >{navTitle}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav navbar>
                    {navlinks}
                  </Nav>
                  {INPUT}
                  <Nav className="ml-auto" navbar>
                     <NavItem>
                      <NavLink href="#" onClick={this.refresh_and_monitor.bind(this)}><i className="fa fa-refresh" aria-hidden="true" data-for="headertt" data-tip={`Refresh view`}></i></NavLink>
                     </NavItem>
                     
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        {/*<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>*/}
                      </DropdownToggle>
                      <DropdownMenu right>
                          {admin_links}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>

              </Navbar>
              <div className="sweet-loading" id="c2_spinner">
                <Spinner
                      sizeUnit={"px"}
                      size={8}
                      color={'#ccc'}
                      loading={this.props.spin} 
                />
              </div>
          </div>
    
  }
}


const mapStateToProps = state => ({
  api_data: state.object,
  inputflag: state.inputReducer,
  spin: state.analyzeReducer.spinner,
  modalview: state.modalReducer.showmodal
})

const mapDispatchToProps = dispatch => ({
  inputaction: bindActionCreators(InputAction,dispatch),
  spinnerAction: bindActionCreators(SpinnerAction,dispatch),
  action: bindActionCreators(ObjectAction, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderNavContainer));