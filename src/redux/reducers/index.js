import { combineReducers } from 'redux';
import currentUser from './current-user';
import customization from './customizationReducer';

const rootReducer = combineReducers({ currentUser, customization });

export default rootReducer;
