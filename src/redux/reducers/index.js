import authReducer from './auth';
import planReducer from './plan'
import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  planReducer
});
