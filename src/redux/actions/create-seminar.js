import fetchAPI from 'utils/fetchAPI';
import { CREATE_SEMINAR_UPDATE } from 'redux/types';
import { currentUserUpdate } from './current-user';

const path = '/seminars';
export const defaultPagination = { page: 0, show: 6, orderBy: 'createdAt', sortBy: 'DESC' };

export const updateCreateSeminar = (payload) => ({
  type: CREATE_SEMINAR_UPDATE,
  payload
});

export const findAllSeminar =
  (pagination = defaultPagination, options = {}) =>
  async (dispatch) => {
    try {
      const body = {};
      const params = { pagination, options };
      const [data, total] = await fetchAPI('GET', { path, body, params });
      dispatch(updateCreateSeminar({ data, total }));
      return data;
    } catch (error) {
      if (error.message === 'Unauthorized') {
        dispatch(currentUserUpdate(null));
      }

      throw error;
    }
  };

export const createSeminar = (data) => async (dispatch) => {
  console.log({ data });
  try {
    await fetchAPI('POST', { path: '/seminars', data });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};

export const removeSeminarById = (seminarId) => async (dispatch) => {
  try {
    await fetchAPI('DELETE', { path: `/seminars/${seminarId}` });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};
