import * as actions from './actionTypes';

const initialFormState = {
	currentChurch: {
		name: '',
		city: '',
		adress: '',
		website: '',
		link: '',
	},
	showForm: false,
	isUpdating: false,
	zoom: 7,
};

export const formReducer = (state = initialFormState, action) => {
	switch (action.type) {
		// CURRENT CHURCH

		case actions.CHURCH_SET:
			return { ...state, currentChurch: action.payload };

		case actions.CHURCH_RESET:
			return initialFormState;

		// FORM

		case actions.FORM_SHOW:
			return { ...state, showForm: true };

		case actions.FORM_HIDE:
			return { ...state, showForm: false };

		case actions.FORM_IS_UPDATING:
			return { ...state, isUpdating: true };

		case actions.FORM_IS_CREATING:
			return { ...state, isUpdating: false };

		// ZOOM

		case actions.ZOOM_SET:
			return { ...state, zoom: action.payload };

		default:
			return state;
	}
};
