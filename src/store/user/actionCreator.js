import * as actions from './actionTypes';

export const actionLoginUser = () => ({
	type: actions.USER_LOGIN,
});

export const actionSetUser = (name) => ({
	type: actions.USER_FETCH,
	payload: name,
});

export const actionLogoutUser = () => ({
	type: actions.USER_LOGOUT,
});
