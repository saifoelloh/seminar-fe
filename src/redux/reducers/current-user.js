import { CURRENT_USER_RESET, CURRENT_USER_UPDATE } from 'redux/types';

export default (state = null, action) => {
  switch (action.type) {
    case CURRENT_USER_UPDATE:
      return { ...state, ...action.payload };
    case CURRENT_USER_RESET:
      return state;
    default:
      return state;
  }
};
