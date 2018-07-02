import APP from './Config.json';
import ActionList from './action/ActionList'
import InfoAction from './components/actions/InfoAction.jsx'
import FormatterList from './components/formatters/FormatterList.jsx'
import './style/style.css'

const BaseUrl = 'http://thomaxxl.pythonanywhere.com'

Object.keys(APP).map(function(key, index) {
    var initVal = {
        column: [],
        actions: Object.keys(ActionList),
        API: key,
        API_TYPE: key,
        path: "/" + key.toLocaleLowerCase(),
        menu: key,
        Title: key + " Page"
    }
    APP [key] = {...initVal, ...APP [key]};
});

ActionList['InfoAction'] = InfoAction

exports.APP = APP
exports.URL = BaseUrl
exports.ActionList = ActionList
exports.FormatterList = FormatterList
