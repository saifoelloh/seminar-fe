import { combineReducers } from 'redux';
import currentUser from './current-user';
import customization from './customizationReducer';
import seminars from './seminars';

const rootReducer = combineReducers({ currentUser, customization, seminars });

export default rootReducer;
