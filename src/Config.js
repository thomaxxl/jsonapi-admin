import APP from './Config.json';

const BaseUrl = 'http://jsonapi.pythonanywhere.com'

const getInitialObject = () => {
    var initObj = {};
    Object.keys(APP).map(function(key, index) {
        initObj [key] = {
            offset: 0,
            limit: 10,
            data: [],
            total: 0,
            filter:{},
        };
    });
    return initObj;
}


Object.keys(APP).map(function(key, index) {
    var initVal = {
        column: [],
        actions: ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'],
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
exports.InitObject = getInitialObject