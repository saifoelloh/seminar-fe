import { EVENT_UPDATE } from 'redux/types';

export default (state = null, action) => {
  switch (action.type) {
    case EVENT_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
