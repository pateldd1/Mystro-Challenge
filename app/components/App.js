/**
 * Auth0Sample 00-Login
 * https://github.com/auth0/react-native-auth0
 * @flow
 */
import {connect} from 'react-redux';
import { loginUser, logoutUser, altLogoutUser } from '../actions/userActions';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);
    this._onLogout = this._onLogout.bind(this);
    // this.state = { accessToken: null };
  }

  _onLogin = () => {
    this.props.loginUser();
  }

  _onLogout = () => {
    if ( Platform.OS === 'android' )
    {
      this.props.altLogoutUser()
    }
    else {
      this.props.logoutUser();
    }
  }

  render() {
    let loggedIn = this.props.accessToken ? true : false;
    // let preferences = () => {
    //
    // }
    console.log("hihihildashf");
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Mystro - Login</Text>
        <Text>
          You are {loggedIn ? '' : 'not '}logged in.
        </Text>
        <Button
          onPress={loggedIn ? this._onLogout : this._onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

let mapStateToProps = (state) => {
  return {
    user_id: state.user.user_id,
    accessToken: state.user.accessToken,
    idToken: state.user.idToken
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser()),
    logoutUser: () => dispatch(logoutUser()),
    altLogoutUser: () => dispatch(altLogoutUser())
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);


// REFER TO IF NEEDED
// _onLogin = () => {
//   auth0.webAuth
//     .authorize({
//       scope: 'openid profile',
//       audience: 'https://' + credentials.domain + '/userinfo'
//     })
//     .then(credentials => {
      // Alert.alert(
      //   'Success',
      //   'AccessToken: ' + credentials.accessToken,
      //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //   { cancelable: false }
      // );
      // auth0.auth
      //   .userInfo({token: credentials.accessToken})
      //   .then(info => {
          // auth0.users(credentials.idToken)
          //   .patchUser({id: info.sub, metadata: {"hello": "joe"}})
          //   .then(x => console.log(x))
          //   .catch(e => console.log(e));
//           auth0.users(credentials.idToken)
//             .getUser({id: info.sub})
//             .then(x => console.log(x))
//             .catch(e => console.log(e));
//         })
//         .catch(error => console.log(error));
//       console.log(credentials);
//       this.setState({ accessToken: credentials.accessToken });
//     })
//     .catch(error => console.log(error));
// };
//
// _onLogout = () => {
//   if (Platform.OS === 'android') {
//     this.setState({ accessToken: null });
//   } else {
//     auth0.webAuth
//       .clearSession({})
//       .then(success => {
//         this.setState({ accessToken: null });
//       })
//       .catch(error => console.log(error));
//   }
// };
