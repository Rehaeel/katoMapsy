import * as actions from './actionTypes';

const initialUserState = {};

export const currentChurchReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actions.CHURCH_SET:
			return action.payload;

		default:
			return state;
	}
};
