import fetchAPI from 'utils/fetchAPI';
import { SEMINAR_UPDATE } from 'redux/types';
import { currentUserUpdate } from './current-user';

const path = '/seminars';
export const defaultPagination = { page: 0, show: 6, orderBy: 'createdAt', sortBy: 'DESC' };

export const updateSeminar = (payload) => ({
  type: SEMINAR_UPDATE,
  payload
});

export const findAllSeminar =
  (pagination = defaultPagination, options = {}, userId = '') =>
  async (dispatch) => {
    try {
      const body = {};
      const params = { pagination, options, exclude: userId };
      const [data, total] = await fetchAPI('GET', { path, body, params });
      dispatch(updateSeminar({ data, total }));
      return data;
    } catch (error) {
      if (error.message === 'Unauthorized') {
        dispatch(currentUserUpdate(null));
      }

      throw error;
    }
  };

export const getSeminarById = (id) => async (dispatch) => {
  try {
    const data = await fetchAPI('GET', { path: `${path}/${id}` });
    return data;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};

export const updateSeminarById = (id, data) => async (dispatch) => {
  try {
    const result = await fetchAPI('PATCH', { path: `${path}/${id}`, data });
    return result;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};

export const enrollSeminar = (id, userId) => async (dispatch) => {
  try {
    const data = await fetchAPI('POST', { path: `${path}/${id}/enroll` });
    await dispatch(findAllSeminar(defaultPagination, {}, userId));
    return data;
  } catch (error) {
    console.log({ error });
    if (error.message === 'Unauthorized') {
      dispatch(currentUserUpdate(null));
    }

    throw error;
  }
};
