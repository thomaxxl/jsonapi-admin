import APP from './Config.json';
import ActionList from './action/ActionList';
import './style.css'

const BaseUrl = 'http://jsonapi.pythonanywhere.com'

Object.keys(APP).map(function(key, index) {
    var initVal = {
        column: [],
        actions: ActionList,
        API: key,
        API_TYPE: key,
        path: "/" + key.toLocaleLowerCase(),
        menu: key,
        Title: key + " Page"
    }
    APP [key] = {...initVal, ...APP [key]};
});

exports.APP = APP
exports.URL = BaseUrl
exports.ActionList = ActionList