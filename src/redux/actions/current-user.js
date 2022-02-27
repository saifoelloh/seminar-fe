import { CURRENT_USER_UPDATE } from '../types';

export const currentUserUpdate = (data) => ({
    type: CURRENT_USER_UPDATE,
    data
});

export const currentUserDelete = () => '';
