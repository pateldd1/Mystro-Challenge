import Auth0 from 'react-native-auth0';

RECEIVED_USER = 'RECEIVED_USER';
UNAUTH_USER = 'UNAUTH_USER';

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
        // { accessToken, idToken } = creds;
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
