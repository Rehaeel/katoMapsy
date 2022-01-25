import * as actions from './actionTypes';

const initialUserState = {
	isAuth: window.localStorage.getItem('name') ? true : false,
	name: window.localStorage.getItem('name') ?? 'user',
	userName: window.localStorage.getItem('userName') ?? '',
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actions.USER_ADD:
			return action.payload;

		case actions.USER_LOGIN:
			return { ...state, isAuth: true, name: action.payload };

		case actions.USER_FETCH:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				userName: action.payload.userName,
			};

		default:
			return state;
	}
};
