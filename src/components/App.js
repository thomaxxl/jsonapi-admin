import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HeaderNavContainer from './HeaderNavContainer';
import ApiRoute  from './ApiObject/ApiObjectContainer';
//import get_ApiObjectContainer  from './ApiObject/ApiObjectContainer';
import BookListContainer  from './Book/BookListContainer';
const history = createBrowserHistory();

//let users = get_ApiObjectContainer("/users", 1)

class App extends Component {
  render() {
    return (
      <div >
          <Router history={history}>
              <div>
                  <HeaderNavContainer />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <ApiRoute path="/users" collection="Users" columns={['Name' , 'Email', 'Comment']}/>
                      <Route path="/books" component={BookListContainer} />
                  </Switch>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
