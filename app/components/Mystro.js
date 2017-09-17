import App from './App'
import React, { Component } from 'react';
// import {Provider} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {configureStore} from '../store';

// let theStore = configureStore();

class Mystro extends Component {
  let Provider = this.props.Provider;
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

export default Mystro;
