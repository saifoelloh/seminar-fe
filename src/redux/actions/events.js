import { EVENT_UPDATE } from 'redux/types';
import fetchAPI from 'utils/fetchAPI';
import { currentUserUpdate } from './current-user';

export const updateEvent = (payload) => ({ type: EVENT_UPDATE, payload });

export const getAllEvent = () => async (dispatch) => {
  try {
    const events = await fetchAPI('GET', { path: '/users/me/events' });
    dispatch(updateEvent(events));
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }
  }
};

export const removeEvent = (seminarId) => async (dispatch) => {
  try {
    await fetchAPI('DELETE', { path: `/seminars/${seminarId}/enroll` });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};
