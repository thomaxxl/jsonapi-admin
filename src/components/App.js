
import React, { Component } from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { query, getRelationship } from 'redux-bees';
import * as Param from '../Config'
import HeaderNavContainer from './HeaderNavContainer'
import Home from './Home'
import ApiObjectContainer from './ApiObject/ApiObjectContainer'
import * as ObjectAction from '../action/ObjectAction'
import * as ModalAction from '../action/ModalAction'
import * as FormAction from '../action/FormAction'
import ItemInfo from './Common/ItemInfo'

const history = createBrowserHistory()

function genCollectionRoute(key) {

    const mapStateToProps = state => ({
        objectKey: key,
        item: Param.APP [key],
        api_data: state.object
    })
    
    const mapDispatchToProps = dispatch => ({
        action: bindActionCreators(ObjectAction, dispatch),
        modalaction: bindActionCreators(ModalAction,dispatch),
        //formaction: bindActionCreators(FormAction,dispatch),
        //getRelationship: getRelationship
    })
    
    const Results = connect(mapStateToProps, mapDispatchToProps)(ApiObjectContainer)
    return <Route sensitive key={key} exact path={Param.APP [key].path} component={Results} />
}

function genItemRoute(key) {

    const mapStateToProps = state => ({
        objectKey: key,
        api_data: state.object,
        item: Param.APP[key]
    })

    const mapDispatchToProps = dispatch => ({
        action: bindActionCreators(ObjectAction, dispatch),
        modalaction: bindActionCreators(ModalAction,dispatch)
    })

    const Results = connect(mapStateToProps, mapDispatchToProps)(ItemInfo)
    let path = `${Param.APP [key].path}/:itemId`
    return <Route sensitive key={path} path={path} component={Results}/>
}


class App extends Component {

    render() {

        const collectionRoutes = Object.keys(Param.APP).map((key) => [genItemRoute(key), genCollectionRoute(key)] )
        return <Router history={history}>
                  <div>
                      <HeaderNavContainer currentPath={history.location.pathname}/>
                      <Switch>
                          <Route exact path="/" component={Home} />
                          {collectionRoutes}
                      </Switch>
                  </div>
              </Router>  
    }
}

export default App
