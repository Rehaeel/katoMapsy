import * as actions from './actionTypes';

const initialUserState = {
	isAuth: window.localStorage.getItem('name') ? true : false,
	name: window.localStorage.getItem('name') ?? '',
	email: '',
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actions.USER_LOGIN:
			return {
				...state,
				isAuth: true,
			};
		case actions.USER_FETCH:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
			};
		case actions.USER_LOGOUT:
			return {
				isAuth: false,
				name: '',
			};

		default:
			return state;
	}
};
