import * as helpers from '../../components/helpers/helpers';
import * as actions from './actionTypes';

const initialFormState = {
	showForm: false,
	isFormUpdating: false,
	zoom: 7,
	mapPosition: [51.919437, 19.145136],
	isRangeUpdating: false,
	currentHoursList: helpers.initHoursList,
	currentChurch: helpers.initCurrentChurch,
	currentRange: helpers.initCurrentRange,
};

export const formReducer = (state = initialFormState, action) => {
	switch (action.type) {
		// CURRENT CHURCH

		case actions.CHURCH_SET:
			return {
				...state,
				currentChurch: action.payload,
			};

		case actions.CHURCH_RESET:
			return {
				...state,
				currentChurch: initialFormState.currentChurch,
				currentHoursList: initialFormState.currentHoursList,
			};

		// FORM

		case actions.FORM_SHOW:
			return {
				...state,
				showForm: true,
			};

		case actions.FORM_HIDE:
			return {
				...state,
				showForm: false,
			};

		case actions.FORM_IS_UPDATING:
			return {
				...state,
				isFormUpdating: true,
			};

		case actions.FORM_IS_CREATING:
			return {
				...state,
				isFormUpdating: false,
			};

		// HOURS

		case actions.FORM_SET_HOURS_LIST:
			return {
				...state,
				currentHoursList: action.payload,
			};

		case actions.FORM_ADD_TO_HOURS_LIST:
			return {
				...state,
				currentHoursList: [...state.currentHoursList, action.payload],
			};
		case actions.FORM_UPDATE_HOURS_LIST:
			return {
				...state,
				currentHoursList: state.currentHoursList.map((range) => {
					if (range.id === action.payload.id) return action.payload;
					else return range;
				}),
			};

		case actions.FROM_DELETE_HOUR:
			return {
				...state,
				currentHoursList: state.currentHoursList.filter(
					(range) => range.id !== action.payload
				),
			};

		case actions.FORM_SET_CURRENT_RANGE:
			return {
				...state,
				currentRange: action.payload,
			};

		case actions.FORM_RESET_CURRENT_RANGE:
			return {
				...state,
				currentRange: helpers.initCurrentRange,
			};

		case actions.FORM_SET_RANGE_IS_UPDATING:
			return {
				...state,
				isRangeUpdating: true,
			};

		case actions.FORM_SET_RANGE_IS_NOT_UPDATING:
			return {
				...state,
				isRangeUpdating: false,
			};

		// MAP

		case actions.MAP_ZOOM_SET:
			return {
				...state,
				zoom: action.payload,
			};

		case actions.MAP_POS_SET:
			return {
				...state,
				mapPosition: action.payload,
			};

		default:
			return state;
	}
};
