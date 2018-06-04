import style from './style';

import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'


const store = createStore(rootReducer)
const rootEl = document.getElementById('app')

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    rootEl
)