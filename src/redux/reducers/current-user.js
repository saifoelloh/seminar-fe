import { CURRENT_USER_UPDATE } from 'redux/types';

export default (state = null, action) => {
    switch (action.type) {
        case CURRENT_USER_UPDATE:
            return action.data;
        default:
            return state;
    }
};
