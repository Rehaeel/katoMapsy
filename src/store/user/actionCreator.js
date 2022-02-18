import * as actions from './actionTypes';

export const actionLoginUser = () => ({
	type: actions.USER_LOGIN,
});

export const actionSetUser = (name, email) => ({
	type: actions.USER_FETCH,
	payload: { name, email },
});

export const actionLogoutUser = () => ({
	type: actions.USER_LOGOUT,
});

export const actionUserShowIntro = () => ({
	type: actions.USER_SHOW_INTRO,
});

export const actionUserHideIntro = () => ({
	type: actions.USER_HIDE_INTRO,
});
