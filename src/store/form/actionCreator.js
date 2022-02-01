import * as actions from './actionTypes';

// CURR CHURCH

export const actionSetCurrChurch = (church) => ({
	type: actions.CHURCH_SET,
	payload: church,
});

export const actionResetChurch = () => ({
	type: actions.CHURCH_RESET,
});

// FORM

export const actionShowForm = () => ({
	type: actions.FORM_SHOW,
});

export const actionHideForm = () => ({
	type: actions.FORM_HIDE,
});

export const actionShowUpdateForm = () => ({
	type: actions.FORM_IS_UPDATING,
});

export const actionShowCreateForm = () => ({
	type: actions.FORM_IS_CREATING,
});

// HOURS

export const actionSetCurrentHoursList = (hours) => ({
	type: actions.FORM_SET_HOURS_LIST,
	payload: hours,
});

export const actionAddCurrentHours = (hours) => ({
	type: actions.FORM_ADD_HOURS,
	payload: hours,
});

export const actionSetCurrentHours = (hours) => ({
	type: actions.FORM_SET_HOURS,
	payload: hours,
});

export const actionUpdateHours = (range) => ({
	type: actions.FORM_UPDATE_HOURS,
	payload: range,
});

export const actionResetCurrentHours = () => ({
	type: actions.FORM_RESET_HOURS,
});

export const actionSetRangeIsUpdating = () => ({
	type: actions.FORM_SET_RANGE_IS_UPDATING,
});

export const actionSetRangeIsNotUpdating = () => ({
	type: actions.FORM_SET_RANGE_IS_NOT_UPDATING,
});

// MAP

export const actionSetZoom = (zoom) => ({
	type: actions.MAP_ZOOM_SET,
	payload: zoom,
});

export const actionsetCurrMapPos = (pos) => ({
	type: actions.MAP_POS_SET,
	payload: pos,
});
