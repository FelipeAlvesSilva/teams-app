import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'

import '../src/components/template/App.css'
import Home from './components/Home'
import mainReducer from './reducers/reducers'

const reduxDT = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise)(createStore)(mainReducer, reduxDT)

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <Home />
        </Provider>
    </StrictMode>, document.getElementById('root'))