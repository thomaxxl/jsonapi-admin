import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HeaderNavContainer from './HeaderNavContainer';
import ApiRoute  from './ApiObject/ApiObjectContainer'; // TODO: rename file & component
import BookListContainer  from './Book/BookListContainer';
const history = createBrowserHistory();

const App_structure = {
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


/* 

TODO: 
  - replace User component with dynamically created ApiObject
  - replace Book component with dynamically created ApiObject

*/


class App extends Component {

  get_routes(){
    App_structure.map((object) => <ApiRoute /> )
  }

  render() {

    // TODO: use get_routes

    return (
      <div >
          <Router history={history}>
              <div>
                  <HeaderNavContainer />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <ApiRoute path={App_structure['User']['Menu_Path']} // navigation menu path
                                collection={App_structure['User']['API_Endpoint']}  // api collection endpoint
                                title={App_structure['User']['Title']}   // title shown
                                actions={App_structure['User']['Actions']}
                                columns={App_structure['User']['Column_names']}
                      />
                      <ApiRoute path={App_structure['Book']['Menu_Path']} // navigation menu path
                                collection={App_structure['Book']['API_Endpoint']}  // api collection endpoint
                                title={App_structure['Book']['Title']}   // title shown
                                actions={App_structure['Book']['Actions']}
                                columns={App_structure['Book']['Column_names']}
                      />
                      <Route path="/books2" component={BookListContainer} />
                  </Switch>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
