import {FormatterList} from './components/formatters/FormatterList.jsx'
import APP from './Config.json';
import ActionList from './action/ActionList'
import InfoAction from './components/actions/InfoAction.jsx'
import {ViewerList} from './components/viewers/ViewerList'
import ItemInfo from './components/Common/ItemInfo'
import './style/style.css'
import Cookies from 'universal-cookie';

const BaseUrl = 'http://thomaxxl.pythonanywhere.com'
const Timing = 5000

Object.keys(APP).map((key, index) => {
    var initVal = {
        column: [],
        actions: Object.keys(ActionList),
        API: key,
        API_TYPE: key,
        path: "/" + key.toLocaleLowerCase(),
        menu: key,
        Title: key + " Page",
        viewer: ItemInfo
    }

    if(APP[key].viewer && ViewerList[APP[key].viewer]){
        APP[key].viewer = ViewerList[APP[key].viewer]
    }

    for( let col of APP[key].column ){

        if(col.editorRenderer && FormatterList[col.editorRenderer]){
            col.editorRenderer = FormatterList[col.editorRenderer]
        }

        if(col.formatter && FormatterList[col.formatter]){
            col.formatter = FormatterList[col.formatter]
        }
    }

    APP[key] = {...initVal, ...APP[key]}
    return null
})


ActionList['InfoAction'] = InfoAction

var URL = BaseUrl
export {APP}
export {URL}
export {ActionList}
export {Timing}
export {FormatterList}

const api_config = {
  baseUrl: BaseUrl,
  configureHeaders(headers) {
    const cookies = new Cookies()
    var token = cookies.get('token')

    return {
      ...headers,
      //'Authorization': `Bearer ${store.getState().session.bearerToken}`,
      'Authorization': 'Bearer ' + token
    };
  },
  afterReject({ status, headers, body }) {

    //document.location = '/login';
    if (status === 401) {
        // ie. redirect to login page
        //document.location = '/login';
        //toastr.error('Not Authorized')
    } else {
        //toastr.error('API Request Rejected', '' , TOASTR_POS)
        return Promise.reject({ status, headers, body: body });
    }
  },
};


const Config = {
    routes : null,
    APP : APP,
    disable_api_url : false
}

export {Config, api_config as config}

