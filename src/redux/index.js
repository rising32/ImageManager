import {createStore, applyMiddleware} from 'redux'
import reducers from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);

const store = createStore(reducers, reduxDevtoolsExtension, enhancer);

export default store