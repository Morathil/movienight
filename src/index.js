/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './reducers/index'
import App from './App'
import firebase from 'firebase'
import * as groupsActions from 'actions/groups'
import * as moviesActions from 'actions/movies'
import * as usersSources from 'sources/users'
import * as apiServices from 'services/api'

if (ENV.NATIVE) {
  document.addEventListener('deviceready', onDeviceReady, false)
} else {
  onDeviceReady()
}

function onDeviceReady () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHdA9Dc0EjqCyN7haA5Ki2aCsDKA2O_7c",
    authDomain: "movienight-8cbd0.firebaseapp.com",
    projectId: "movienight-8cbd0",
    storageBucket: "movienight-8cbd0.appspot.com",
    messagingSenderId: "662728681107",
    appId: "1:662728681107:web:efb5c979e48fc27d3c4f66"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  apiServices.initialize()
  usersSources.initialize(store.dispatch) // after firebase init

  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('deviceready')
  )
}

window.Debug = {
  store: store,
  apiServices,
  groupsActions,
  moviesActions
}

window.log = (data) => { console.log(data) }