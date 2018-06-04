import React, { Component } from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Param from '../Config'
import HeaderNavContainer from './HeaderNavContainer'
import Home from './Home'
import ApiObjectListContainer from './ApiObject/ApiObjectContainer'
import * as ObjectAction from '../action/ObjectAction'
import * as ModalAction from '../action/ModalAction'
import * as FormAction from '../action/FormAction'

const history = createBrowserHistory()

function genRoute(key) {

    const mapStateToProps = state => ({
        objectKey: key,
        item: Param.APP [key],
        datas: state.object
    })
    
    const mapDispatchToProps = dispatch => ({
        action: bindActionCreators(ObjectAction, dispatch),
        modalaction: bindActionCreators(ModalAction,dispatch),
        formaction: bindActionCreators(FormAction,dispatch),
    })
    
    const Results = connect(mapStateToProps, mapDispatchToProps)(ApiObjectListContainer)
    return <Route key={key} path={Param.APP [key].path} component={Results} />
}

class App extends Component {

    render() {
        const routes = Object.keys(Param.APP).map((key) => genRoute(key) )
        return <Router history={history}>
                  <div>
                      <HeaderNavContainer />
                      <Switch>
                          <Route exact path="/" component={Home} />
                          {routes}
                      </Switch>
                  </div>
              </Router>  
    }
}

export default App
