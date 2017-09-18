import { merge } from 'lodash';
RECEIVED_USER = 'RECEIVED_USER';
UNAUTH_USER = 'UNAUTH_USER';
RECEIVED_PREFERENCES = 'RECEIVED_PREFERENCES';

let defaultState = {
  user_id: undefined,
  accessToken: undefined,
  idToken: undefined,
  preferences: {
    distance: undefined,
    passengerRating: undefined,
    application: undefined,
    otherOnLine: undefined,
    carPool: undefined
  }
};

module.exports = (state=defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVED_USER:
      let uservals = {user_id: action.user_id,
                  accessToken: action.accessToken,
                      idToken: action.idToken };
      console.log(uservals);
      return Object.assign({}, state, uservals);
    case UNAUTH_USER:
      return Object.assign({}, state, {accessToken: null,
         user_id: null, idToken: null, preferences: {}});
    case RECEIVED_PREFERENCES:
      if ( action.data )
      {
        return Object.assign({}, state, { preferences: action.data });
      }
      else {
        return Object.assign({}, state, { preferences: {} });
      }
    default:
      return state;
  }
};
