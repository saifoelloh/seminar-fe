import { combineReducers } from 'redux';
import currentUser from './current-user';
import customization from './customizationReducer';
import seminars from './seminars';
import events from './events';

const rootReducer = combineReducers({ currentUser, customization, seminars, events });

export default rootReducer;
