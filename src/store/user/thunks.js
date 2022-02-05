import { fetchUserCreate, fetchLogInUser, fetchUser } from '../services';
import * as actions from './actionCreator';

export const thunkLoginUser = (user) => async (dispatch, _) => {
	const response = await fetchLogInUser(user);
	const token = response.data;

	window.localStorage.setItem('token', token);

	dispatch(actions.actionLoginUser());

	return { token };
};

export const thunkFetchUser = (token) => async (dispatch, _) => {
	const response = await fetchUser(token);
	const [name, email] = response.data;

	dispatch(actions.actionSetUser(name, email));
	return { name, email };
};

export const thunkCreateUser = (user) => async (dispatch, _) => {
	await fetchUserCreate(user)
		.then((res) => {
			window.localStorage.setItem('token', res.data);
			dispatch(actions.actionLoginUser());
			return res.data;
		})
		.then((token) => fetchUser(token))
		.then((res) => res.data)
		.then((user) => {
			const [name, email] = user;
			dispatch(actions.actionSetUser(name, email));
			return user;
		});
};

export const thunkLogoutUser = () => (dispatch, _) => {
	window.localStorage.removeItem('token');
	dispatch(actions.actionLogoutUser());
};
