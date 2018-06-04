const BaseUrl = 'http://jsonapi.pythonanywhere.com'
const APP = {
    User: {
        'column': [
            {
                name: 'Name',
                api: 'name',
                type: 'text',
                placeholder: 'Type name.',
            },
            {
                name: 'Email',
                api: 'email',
                type: 'email',
                placeholder: 'Type email.',
            },
            {
                name: 'comment',
                display_name: 'Comment',
                api: 'comment',
                type: 'textarea',
                placeholder: 'Type comment.',
            }],
        'actions': ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'],
        'path' : '/users',
        'API' : 'Users',
        'API_TYPE': 'User',
        'menu' : 'MyUsers',
        'Title' : 'My Users',
    },
    Books: {
        'column': [
            {
                name: 'Book display name',
                api: 'name',
                type: 'text',
                placeholder: 'Type name.',
            },
            {
                name: 'User_id',
                api: 'user_id',
                type: 'text',
                placeholder: 'Type user_id.',
            }],
        'actions': ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'],
        'API_TYPE': 'Book',
    }
}


const getInitialObject = () => {
    var initObj = {};
    Object.keys(APP).map(function(key, index) {
        initObj [key] = [];
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

console.log(APP);
exports.APP = APP
exports.URL = BaseUrl
exports.InitObject = getInitialObject