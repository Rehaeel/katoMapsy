import * as actions from './actionTypes';

const initialUserState = {
	list: [],
	isFetched: false,
};

export const churchReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actions.CHURCH_LIST_SET:
			return { ...state, list: action.payload, isFetched: true };

		case actions.CHURCH_ADD:
			return {
				...state,
				list: [...state.list, action.payload],
			};

		case actions.CHURCH_UPDATE:
			return {
				...state,
				list: state.list.map((church) => {
					if (church.id !== action.payload.id) return church;
					else return action.payload;
				}),
			};

		default:
			return state;
	}
};
