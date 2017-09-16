import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './userReducer';

module.exports = combineReducers({
  user: userReducer
});
