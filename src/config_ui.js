const BaseUrl = 'http://thomaxxl.pythonanywhere.com'

const App_structure = {
    'Menu':['users','books'],
    'User':{
        'Column_names' : ['Name','Email','Comment'], //Number,
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction']
    },
    'Book':{
        'Column_names' : ['Name','User_id'],
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction']
    }
}

/*

const App_structure = {
    'User':{
        'Column_names' : ['Name','Email','Comment'],
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'], 

        'Menu_Name' : 'MyUsers', // name that will appear in the navbar. If this is not defined then it will use 'User'
        'API_Endpoint' : 'Users' // Jsonapi endpoint , if this is not defined, it will use "User"

    },
    'Book':{
        'Column_names' : ['Name','User_id'],
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction']
        // no Menu_Name => menu navbar will show "Book"
        // no API_Endpoint => jsonapi endpoint will be "Book"
    }
}

*/

exports.App_structure = App_structure
exports.BaseUrl = BaseUrl


