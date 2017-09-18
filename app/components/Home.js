/**
 * Auth0Sample 00-Login
 * https://github.com/auth0/react-native-auth0
 * @flow
 */
import {connect} from 'react-redux';
import { loginUser, logoutUser, altLogoutUser, requestPreferences, updatePreferences } from '../actions/userActions';
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

class Home extends Component {
  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this.navigation = this.navigation.bind(this);
    // this.state = { accessToken: null };
  }

  componentDidMount() {
    if ( this.props.accessToken && this.props.user_id && this.props.idToken)
    {
      this.props.requestPreferences(this.props.idToken, this.props.user_id)
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log("updated");
    console.log(prevProps, this.props, prevState, this.state);
    if (prevProps.accessToken !== this.props.accessToken)
    {
      console.log("i'm in");
      this.props.requestPreferences(this.props.idToken, this.props.user_id);
    }
    else if (this.props.accessToken){
      console.log('im out');
      this.navigation();
    }
  }

  //If there are no preferences, then go to preferences screens
  //Else remain on this screen and see your preferences
  navigation(){
    let {preferences} = this.props;
    let prefKeys = Object.keys(preferences)
    for (let i = 0; i < prefKeys.length; i++)
    {
      console.log(prefKeys[i]);
      //Checking if any preferences are available in the preferences object
      if (preferences[prefKeys[i]]){
        return;
      }
    }
    //Pass Props of the User Id later to light up the preferences already selected - Extra
    this.props.navigator.push({
      screen: 'PreferenceOne',
      title: 'Preferences 1',
      animated: true,
      animationType: 'fade',
      backButtonHidden: true
    });
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
    console.log("Logged");
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
    idToken: state.user.idToken,
    preferences: state.user.preferences
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser()),
    logoutUser: () => dispatch(logoutUser()),
    altLogoutUser: () => dispatch(altLogoutUser()),
    requestPreferences: (idToken, user_id) => dispatch(requestPreferences(idToken, user_id)),
    updatePreferences: (idToken, user_id, prefs) => dispatch(updatePreferences(idToken, user_id, prefs))
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);


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
