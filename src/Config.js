import CreateAction from "./components/actions/CreateAction";
import EditAction from "./components/actions/EditAction";
import DeleteAction from "./components/actions/DeleteAction";
import AnalyzeAction from "./components/actions/AnalyzeAction";

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
                name: 'Comment',
                api: 'comment',
                type: 'textarea',
                placeholder: 'Type comment.',
            }],
        'actions': [CreateAction, EditAction, DeleteAction, AnalyzeAction],
        'path' : '/users',
        'API' : 'Users',
        'API_TYPE': 'User',
        'menu' : 'MyUsers',
        'Title' : 'My Users',
    },
    Books: {
        'column': [
            
            {
                name: 'This is Name',
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
        'actions': [CreateAction, EditAction, DeleteAction, AnalyzeAction],
//        'API' : 'Books',
        'API_TYPE': 'Book',
//        'path' : '/books',
//        'menu' : 'Book Menu',
//        'Title' : 'My Books',
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
        actions: [CreateAction, EditAction, DeleteAction, AnalyzeAction],
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


