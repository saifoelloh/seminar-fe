import { CURRENT_USER_UPDATE } from 'redux/types';

export const currentUserUpdate = (payload) => ({
  type: CURRENT_USER_UPDATE,
  payload
});

export const currentUserDelete = () => '';
