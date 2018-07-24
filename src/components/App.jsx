
import './style/bootstrapstyle.css'
import '../style/style.css'
import * as Param from '../Config'
import React, { Component } from 'react'
//import createBrowserHistory from 'history/createBrowserHistory'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { getRelationship } from 'redux-bees';
import HeaderNavContainer from './HeaderNavContainer'
import Home from './Home'
import ApiObjectContainer from './ApiObject/ApiObjectContainer'
import * as ObjectAction from '../action/ObjectAction'
import * as ModalAction from '../action/ModalAction'
import * as InputAction from '../action/InputAction'
import ItemInfo from './Common/ItemInfo'

//const history = createBrowserHistory()

function genCollectionRoute(key) {

    const mapStateToProps = state => ({
        objectKey: key,
        item: Param.APP[key],
        api_data: state.object,
        inputflag: state.inputReducer
    })
    
    const mapDispatchToProps = dispatch => ({
        action: bindActionCreators(ObjectAction, dispatch),
        modalaction: bindActionCreators(ModalAction,dispatch),
        inputaction: bindActionCreators(InputAction,dispatch),
        //formaction: bindActionCreators(FormAction,dispatch),
        //getRelationship: getRelationship
    })
    
    const Results = connect(mapStateToProps, mapDispatchToProps)(ApiObjectContainer)
    const path = Param.APP[key].path
    return <Route key={key}  path={path} component={Results} />
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

    const component_info = Param.APP[key]

    if(!component_info){
        alert('Invalid Component')
        return <div/>
    }
    const Viewer  = component_info.viewer ? component_info.viewer : ItemInfo
    const Results = connect(mapStateToProps, mapDispatchToProps)(Viewer)
    const path = `${component_info.path}/:itemId`
    return <Route sensitive key={path} path={path} component={Results}/>
}


class App extends Component {

    render() {

        const collectionRoutes = Object.keys(Param.APP).map((key) => [genItemRoute(key), genCollectionRoute(key)] )
        return <HashRouter>
                  <div>
                      <HeaderNavContainer/>
                      <Switch>
                          <Route exact path="/" component={Home} />
                          {collectionRoutes}
                          
                      </Switch>
                  </div>
                </HashRouter>  
    }
}

export default App
