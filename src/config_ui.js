const BaseUrl = 'http://thomaxxl.pythonanywhere.com'


const App_structure = {
	'Menu':['users','books'],
    'User':{
        'Column_names' : ['Name','Email','Comment'],
        // TODO: use classes instead of strings
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'], 
        'API_Endpoint' : 'Users', // Jsonapi endpoint , if this is not defined, it will use "User"
        'Menu_Name' : 'MyUsers', // name that will appear in the navbar. If this is not defined then it will use 'User'
        'Menu_Path' : '/users',
        'Title' : 'My Users',
    },
    'Book':{
        'Column_names' : ['Name','User_id'],
        'Actions' : ['CreateAction', 'EditAction', 'DeleteAction', 'AnalyzeAction'],
        // no Menu_Name => menu navbar will show "Book"
        // no API_Endpoint => jsonapi endpoint will be "Book"
        'API_Endpoint' : 'Books', // Jsonapi endpoint , if this is not defined, it will use "User"
        'Menu_Name' : 'Books', // name that will appear in the navbar. If this is not defined then it will use 'User', TODO
        'Menu_Path' : '/books',
        'Title' : 'My Books',
    }
}

exports.App_structure = App_structure
exports.BaseUrl = BaseUrl


