import * as axios from 'axios';

const BASE_URL = 'http://localhost:3456';

/**
 * @param {string} method
 * @param {string} path
 * @param {object} data
 * @param {object} params
 * @returns {object}
 */
const fetchAPI = async (method = 'GET', { path = '', data = {}, params = {} }) => {
    const url = `${BASE_URL}${path}`;
    console.log({ url });
    const { data: result } = await axios({
        method,
        url,
        data,
        params,
        withCredentials: true
    });
    return result;
};

export default fetchAPI;
