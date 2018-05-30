import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HeaderNavContainer from './HeaderNavContainer';
import ApiRoute  from './ApiObject/ApiObjectContainer'; // TODO: rename file & component
import BookListContainer  from './Book/BookListContainer';
import * as Param from '../config_ui'

const history = createBrowserHistory();
const App_structure = Param.App_structure

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
    // TODO: generate HeaderNavContainer with App_structure props

    return (
      <div>
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
