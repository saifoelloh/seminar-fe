import { combineReducers } from 'redux';
import currentUser from './current-user';
import customization from './customizationReducer';
import seminars from './seminars';
import events from './events';
import createSeminar from './create-seminar';

const rootReducer = combineReducers({ currentUser, customization, seminars, events, createSeminar });

export default rootReducer;
