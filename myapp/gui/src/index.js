import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers/';
import thunk from "redux-thunk";
import {loadPosts} from './actions/getPostsActions';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; 

import reducer from './reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION__ || compose
const store = createStore(
  allReducers,
  applyMiddleware(thunk)
);


/*const store = createStore(reducer,composeEnhances(
  applyMiddleware(thunk)
));*/

store.dispatch(loadPosts('geia'));
console.log('store: ',store.getState())
console.log('localStorage',localStorage)


ReactDOM.render(
                <Provider store={store}>
                  <BrowserRouter>  
                   <App />
                   
                  </BrowserRouter>
                </Provider>  
                , document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
