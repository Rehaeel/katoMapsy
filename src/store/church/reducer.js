import * as actions from './actionTypes';

const initialUserState = [];

export const churchReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actions.CHURCH_LIST_SET:
			return action.payload;

		case actions.CHURCH_ADD:
			return [...state, action.payload];

		case actions.CHURCH_UPDATE:
			return state.map((church) => {
				if (church.id !== action.payload.id) return church;
				else return action.payload;
			});

		case actions.CHURCH_DELETE:
			return [...state].filter((church) => church.id !== action.payload);

		default:
			return state;
	}
};
