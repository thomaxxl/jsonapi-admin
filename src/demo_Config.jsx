/*
    UI Configuration script:
    * Import all viewers & formatters
    * Prepare the configuration objects that will be used by the other components:
        - APP
        - api_config
        - ui_config
        - FormatterList
        - ViewerList
        - ... etc. (check the exports)
*/
import React, { PropTypes } from 'react'
import Cookies from 'universal-cookie';
import toastr from 'toastr'
import {buildApi, get, post, patch, destroy, configureHeaders, afterReject } from 'redux-bees';
import APP from './Config.json';
import ActionList from './components/actions/ActionList'
import {FormatterList} from './components/formatters/FormatterList.jsx'
import {ViewerList} from './components/viewers/ViewerList'
import {ItemInfo} from './components/Common/ItemInfo'
import {InfoAction} from './components/actions/InfoAction.jsx'
import {Home} from './components/Home'
import {get_auth, authenticate} from './components/Common/auth'
import HeaderNavContainer from './components/HeaderNavContainer'
/*
    Process the Config.json APP items: add default viewers and renderers
*/

/*import raw from "raw.macro";
import yaml from 'js-yaml';

const txt = raw('Config.yml')
console.log(txt)

let APP
// Get document, or throw exception on error
try {
  APP = yaml.safeLoad(txt);
} catch (e) {
  console.log(e);
  alert('Failed to parse config')
}
*/

const NewFormatterList = Object.assign({}, FormatterList) // the formatterlist used to render the tables
let cookies = new Cookies()
const owner_id = cookies.get('userid', '')
const username = cookies.get('username', '')
const role = cookies.get('role', '')
const toastrPosition =  {positionClass: "toast-bottom-right"}


function format_APP(APP){
    /*
        Custom parsing for the APP entries
    */
    Object.keys(APP).map(function(key, index) {
        var initVal = {
            column: [],
            actions: Object.keys(ActionList),
            API: key,
            API_TYPE: key,
            path: "/" + key.toLocaleLowerCase(),
            menu: APP[key].menu? APP[key].menu : key,
            Title: key + " Page",
            viewer: ItemInfo,
            main_show: "name"
        }

        if(!APP[key].route){
            APP[key].route = key
        }

        if(APP[key].viewer && ViewerList[APP[key].viewer]){
            APP[key].viewer = ViewerList[APP[key].viewer]
        }

        if(APP[key].container && ViewerList[APP[key].container]){
            APP[key].container = ViewerList[APP[key].container]
        }

        // "column" changed to "columns" , we 
        var columns = APP[key].column ? APP[key].column : APP[key].columns ? APP[key].columns : []
        for(let col of columns){
            if(col.editorRenderer && NewFormatterList[col.editorRenderer]){
                col.editorRenderer = NewFormatterList[col.editorRenderer]
            }
            if(col.formatter && NewFormatterList[col.formatter]){
                col.formatter = NewFormatterList[col.formatter]
            }
            /* 
                todo: this is poorly named in the json, it should be changed like this:
                relation_name
                relation_type 
            */
            col.relation_url = col.relation_url || col.relationship
        }
        APP[key].column = columns 
        APP[key].columns = columns 

        APP[key] = {...initVal, ...APP[key]};

        if(APP[key].roles && !APP[key].roles.includes(role)){
            delete APP[key]
        }
    })
}

format_APP(APP)

/*
    ActionList: action button dispatch, used by the APP item "action" arrays
ActionList['InfoAction'] = InfoAction
ActionList['PciAction'] = ImagePVAction
ActionList['ImageCreateAction'] = ImageCreateAction
*/


/*
    UI configuration: title, home screen etc.
*/
const Config = {
    routes : null,
    static : APP,
    disable_api_url : true,
    title : 'Json:api Admin',
    home : null,
    enable_login : false,
    authenticate: authenticate,
    NavTitle: 'J:A',
    FormatterList: NewFormatterList,
    ActionList: ActionList,
    role: role,
    username: username,
    email: cookies.get('email', '')
}

function logged_in(){
    const cookies = new Cookies();
    return cookies.get('token')
}
/*
    API Configuration:
*/
function get_root(){
    // Backend(api) root
    
    return "http://192.168.193.136:5000"
}

// The URL of the jsonapi backend where we fetch all of our data
let BaseUrl = get_root() + '/api'
const URL = BaseUrl
cookies.set('api_url', URL)

const api_config = {
  baseUrl: BaseUrl,
  limit: 20,
  APP: APP,

  configureHeaders(headers) {
    // API Configuration: Authentication with JWT bearer token
    return {
      ...headers,
      //'Authorization': `Bearer ${store.getState().session.bearerToken}`,
      'Authorization': 'Bearer ' + get_auth()
    };
  },
  afterReject({ status, headers, body }) {
    // Show toastr popup in case the server returns a HTTP error
    const cookies = new Cookies()
    const toastrPosErr =  {positionClass: "toast-top-center"}
    var token = cookies.get('token')
    if (status === 401) {
        toastr.error('Not Authorized')
        Config.authenticate(BaseUrl) // deauth => remove cookies
    } 
    if (status === 500 ){
        toastr.error('Internal server error')
    }
    else {
        if(status && status != 404 && status != 302){
            toastr.error(`API Request Rejected ${status}`, '' , toastrPosErr)
        }
        console.log('API Request Rejected:', status)
        if(status === undefined && headers === undefined && logged_in() && document.location.href.includes("index")){
            // stupid edge case when clicking a link from a status mail
            console.log("Force Reloading")
            document.location.reload();
        }
        //cookies.remove('token');
        //cookies.remove('session');
        return Promise.reject({ status, headers, body: body });
    }
  },
}

Config.api_config = api_config
Config.logout_url = get_root() + '/admin/logout'

const api_objects = {
}

const Timing = 500000

export {api_config, Config, Config as ui_config, NewFormatterList as FormatterList, api_objects, toastrPosition, toastrPosition as toasterPosition}
export {APP, ActionList, Timing, HeaderNavContainer, Home}

