import { merge } from 'lodash';
RECEIVED_USER = 'RECEIVED_USER';
UNAUTH_USER = 'UNAUTH_USER';
RECEIVED_PREFERENCES = 'RECEIVED_PREFERENCES';

//This is our default state of the user.
//Because of this, our User will have a default of all of this.
//Once they are signed in, they will have a user_id and the other stuff will stay the same.
//When they have navigated to the Home page rather than the login Page, Then we go through
//Component did mount in the home component, in which we render default values first, and then AFTER home component is mounted
//we will make a thunk action creator called 'requestTransactions(user_id)'. This will go to the backend and get the transactions AND balance
//and then this will force a re-rendering of the home page with those database values. Look at the authactions for followup documentation

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

//We have to use Object.assign for a shallow merging and merge for a deep merging which would also merge the inner arrays of the object.
module.exports = (state=defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVED_USER:
      let uservals = {user_id: action.user_id,
                  accessToken: action.accessToken,
                      idToken: action.idToken }
      return Object.assign({}, state, uservals);
    case UNAUTH_USER:
      return Object.assign({}, state, defaultState);
    case RECEIVED_PREFERENCES:
      return merge({}, state, { preferences: action.data })
    default:
      return state;
  }
};
