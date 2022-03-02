import { SEMINAR_UPDATE } from 'redux/types';

export default (state = null, action) => {
  switch (action.type) {
    case SEMINAR_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
