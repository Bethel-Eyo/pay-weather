import { combineReducers } from 'redux';
import weather from './weather';
import loading from './loading';

export default combineReducers({
  weather,
  loading
});