import Auth0 from 'react-native-auth0';

RECEIVED_USER = 'RECEIVED_USER';
UNAUTH_USER = 'UNAUTH_USER';
RECEIVED_PREFERENCES = 'RECEIVED_PREFERENCES';

let credentials = require('../auth0-credentials');
const auth0 = new Auth0(credentials);

exports.loginUser = () => {
  return function(dispatch){
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then((creds) => {
        auth0.auth
          .userInfo({token: creds.accessToken})
          .then(info => {
            let user_id = info.sub;
            dispatch(receivedUser(creds.accessToken, creds.idToken, user_id));
          }).catch((err)=> console.log(err))
      }).catch((err)=> console.log(err))
  }
}

exports.logoutUser = () => {
  return function(dispatch) {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        dispatch(unauthUser());
      })
  }
}

exports.requestPreferences = (idToken, user_id) => {
  return function(dispatch) {
    auth0.users(idToken)
      .getUser({ id: user_id })
      .then((info) => {
        let preferences = undefined;
        if ( info.userMetadata )
        {
          preferences = info.userMetadata.preferences;
        }
        dispatch(receivedPreferences(preferences));
      })
      .catch(e => console.log(e));
  }
}

//a prefs object is going to be sent in to change preferences of the user.
//It will come after the user is done making his preferences.
//It will be the same format as the preferences that come back from auth0

exports.updatePreferences = (idToken, user_id, prefs) => {
  return function(dispatch) {
    auth0.users(idToken)
      .patchUser({ id: user_id, metadata: {preferences: prefs} })
      .then(() => {
        dispatch(receivedPreferences(prefs));
      })
      .catch(e => console.log(e));
  }
}

exports.altLogoutUser = () => {
  return function(dispatch) {
    dispatch(unauthUser());
  }
}

let receivedUser = (accessToken, idToken, user_id) => {
  return {
    type: RECEIVED_USER,
    accessToken,
    idToken,
    user_id
  }
}

let unauthUser = () => {
  return {
    type: UNAUTH_USER
  }
}

let receivedPreferences = (data) => {
  return {
    type: RECEIVED_PREFERENCES,
    data
  }
}
