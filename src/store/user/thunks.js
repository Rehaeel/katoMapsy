import { fetchUserCreate, fetchLogInUser, fetchUser } from '../services';
import {
	actionLoginUser,
	actionLogoutUser,
	actionSetUser,
} from './actionCreator';

export const thunkLoginUser = (user) => async (dispatch, _) => {
	const response = await fetchLogInUser(user);
	const token = response.data;

	window.localStorage.setItem('token', token);

	dispatch(actionLoginUser());

	return { token };
};

export const thunkFetchUser = (token) => async (dispatch, _) => {
	const response = await fetchUser(token);
	const name = response.data;

	dispatch(actionSetUser(name));
	return name;
};

export const thunkCreateUser = (user) => async (dispatch, _) => {
	const tokenResponse = await fetchUserCreate(user);
	window.localStorage.setItem('token', tokenResponse.data);
	dispatch(actionLoginUser());

	const userResponse = await fetchUser(tokenResponse.data);
	const name = userResponse.data;

	dispatch(actionSetUser(name));

	return name;
};

export const thunkLogoutUser = () => (dispatch, _) => {
	window.localStorage.removeItem('token');
	dispatch(actionLogoutUser());
};
