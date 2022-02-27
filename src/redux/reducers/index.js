const { combineReducers } = require('redux');
const currentUser = require('./current-user');

const rootReducer = combineReducers(currentUser);

export default rootReducer;
