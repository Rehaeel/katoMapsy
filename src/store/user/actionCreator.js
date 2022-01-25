import * as actions from './actionTypes';

export const actionSetUser = (name, userName) => ({
	type: actions.USER_FETCH,
	payload: { name, userName },
});
