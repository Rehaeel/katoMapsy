import * as actions from './actionTypes';

const initialUserState = {
	isAuth: window.localStorage.getItem('name') ? true : false,
	name: window.localStorage.getItem('name') ?? '',
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
				name: action.payload,
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
