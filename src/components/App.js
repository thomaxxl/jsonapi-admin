import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Param from '../Config';
import HeaderNavContainer from './HeaderNavContainer';


import Home from './Home';
import ApiObjectListContainer from './ApiObject/ApiObjectContainer';

import * as ObjectAction from '../action/ObjectAction';
import * as ModalAction from '../action/ModalAction';
import * as FormAction from '../action/FormAction';

const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <div >
          <Router history={history}>
              <div>
                  <HeaderNavContainer />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      {
                        Object.keys(Param.APP).map(function(key, index) {
                            const mapStateToProps = state => ({
                                objectKey: key,
                                item: Param.APP [key],
                                datas: state.object
                            });
                            
                            const mapDispatchToProps = dispatch => ({
                                action: bindActionCreators(ObjectAction, dispatch),
                                modalaction: bindActionCreators(ModalAction,dispatch),
                                formaction: bindActionCreators(FormAction,dispatch),
                            });
                            const Results = connect(mapStateToProps, mapDispatchToProps)(ApiObjectListContainer);
                            return (<Route key={index} path={Param.APP [key].path} component={Results} />);
                        })
                      }
                  </Switch>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
