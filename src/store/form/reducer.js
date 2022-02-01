import * as actions from './actionTypes';

const initialCurrentRange = {
	id: '',
	interval: true,
	holySundays: [''],
	weekdays: [''],
};

const initialFormState = {
	currentChurch: {
		name: '',
		city: '',
		adress: '',
		website: '',
		link: '',
	},
	showForm: false,
	isFormUpdating: false,
	zoom: 7,
	mapPosition: [51.919437, 19.145136],
	currentHoursList: [],
	isRangeUpdating: false,
	currentRange: initialCurrentRange,
};

export const formReducer = (state = initialFormState, action) => {
	switch (action.type) {
		// CURRENT CHURCH

		case actions.CHURCH_SET:
			return { ...state, currentChurch: action.payload };

		case actions.CHURCH_RESET:
			return {
				...state,
				currentChurch: initialFormState.currentChurch,
				currentHoursList: initialFormState.currentHoursList,
				currentRange: initialCurrentRange,
			};

		// FORM

		case actions.FORM_SHOW:
			return { ...state, showForm: true };

		case actions.FORM_HIDE:
			return { ...state, showForm: false };

		case actions.FORM_IS_UPDATING:
			return { ...state, isFormUpdating: true };

		case actions.FORM_IS_CREATING:
			return { ...state, isFormUpdating: false };

		// HOURS

		case actions.FORM_SET_HOURS_LIST:
			return { ...state, currentHoursList: action.payload };

		///////////////////////////////////
		case actions.FORM_ADD_HOURS:
			return {
				...state,
				currentHoursList: [...state.currentHoursList, action.payload],
			};
		case actions.FORM_UPDATE_HOURS:
			return {
				...state,
				currentHoursList: [...state.currentHoursList].map((range) => {
					if (range.id === action.payload.id) return action.payload;
					else return range;
				}),
			};

		case actions.FORM_SET_HOURS:
			return { ...state, currentRange: action.payload };

		case actions.FORM_RESET_HOURS:
			return { ...state, currentRange: initialFormState.currentRange };

		case actions.FORM_SET_RANGE_IS_UPDATING:
			return { ...state, isRangeUpdating: true };

		case actions.FORM_SET_RANGE_IS_NOT_UPDATING:
			return { ...state, isRangeUpdating: false };

		// MAP

		case actions.MAP_ZOOM_SET:
			return { ...state, zoom: action.payload };

		case actions.MAP_POS_SET:
			return { ...state, mapPosition: action.payload };

		default:
			return state;
	}
};
