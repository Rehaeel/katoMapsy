import { fetchUserResponse } from '../services';
import { actionSetUser } from './actionCreator';

export const getUserThunk = (user) => async (dispatch, _) => {
	const response = await fetchUserResponse(user);
	const { userName, name } = response.data[0];

	window.localStorage.setItem('name', name);
	window.localStorage.setItem('userName', userName);
	dispatch(actionSetUser(name, userName));
};
