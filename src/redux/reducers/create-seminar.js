import { CREATE_SEMINAR_UPDATE } from 'redux/types';

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_SEMINAR_UPDATE:
      return action.payload;

    default:
      return state;
  }
};
