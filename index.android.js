import registerApp from './app/index';
import { Provider } from 'react-redux';
import { configureStore } from './app/store';

const store = configureStore();
registerApp(store, Provider);



// import App from './app/components/App'
// import React, { Component } from 'react';
// import {Provider} from 'react-redux';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// import {configureStore} from './app/store';
//
// let theStore = configureStore();
// class Mystro extends Component {
//   render() {
//     return (
//       <Provider store={theStore}>
//         <App />
//       </Provider>
//     );
//   }
// }
//
// AppRegistry.registerComponent('Auth0Sample', () => Mystro);
