import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import postItApp from './reducers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import dataService from './services/dataservice';
// Styling
import 'materialize-css/bin/materialize.css';
import 'jquery/dist/jquery';
import './scss/style.scss'; // Custom styling
import './js/customJS';
import './js/materialize';

// Routes
import App from './components/App.jsx';
import Home from './components/views/Index.jsx';
import CreateGroup from './components/views/CreateGroup.jsx';
import MessageBoard from './components/views/MessageBoard.jsx';
import PostMessage from './components/views/PostMessage.jsx';
import SignUp from './components/views/SignUp.jsx';

$(document).ready(() => {
  $('.button-collapse').sideNav();
}); 


const appStore = {
  // Hold some groups (batch loading from db for pagination)
  groups: { meta: { count: 0 }, userGroups: { 1: { members: { 1: {}, 2: {}}, groupId: '1', messages: [], info: { title: 'A Test Group', description: 'Details about it'}} } },
  // This will contain all the groups and everything about each
  allUserGroups : { meta: {count: 0}, userGroups: {1: {members: {1: {}, 2: {}}, groupId: '1', messages: [], info: {title: 'Just A Test Group', description: 'Some Deets'}}}},
  apiError: { errored: false, message: null, redirect: { yes: false, to: null} }, // This indicates any error during queries to the API
  appInfo: {
    userDetails: { firstName: 'a', lastName: 'a', id: '1', token: '1', email: '', phone: ''},
    authState: { signedIn: false, redirect: false },
    loadedMessages: {
      groupId: '999'
    }
  },
  dataLoading: true,
  postItInfo: {
    members: {
      postItMembers: {
        1: {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', id: 1}
      },
      meta: {count: 5}
    },
    groups: {
      postItGroups: {
        1: {},
        2: {} },
        meta: {count: 5}
      }
    }
}


let store = createStore(postItApp, appStore, applyMiddleware(dataService));


ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>, document.getElementById('app')
);


