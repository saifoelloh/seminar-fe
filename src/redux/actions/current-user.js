import { CURRENT_USER_UPDATE } from 'redux/types';
import fetchAPI from 'utils/fetchAPI';

export const currentUserUpdate = (payload) => ({
  type: CURRENT_USER_UPDATE,
  payload
});

export const checkUser = () => async (dispatch) => {
  try {
    const user = await fetchAPI('GET', { path: '/users/me' });
    dispatch(currentUserUpdate(user));
  } catch (error) {
    console.log({ error });
    dispatch(currentUserUpdate(null));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await fetchAPI('POST', { path: '/users/logout' });
    dispatch(currentUserUpdate(null));
  } catch (error) {
    console.log({ error });
  }
};
