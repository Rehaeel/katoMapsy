import * as actions from './actionTypes';

export const actionSetCurrChurch = (church) => ({
	type: actions.CHURCH_SET,
	payload: church,
});

export const actionSetZoom = (zoom) => ({
	type: actions.ZOOM_SET,
	payload: zoom,
});

export const actionResetChurch = () => ({
	type: actions.CHURCH_RESET,
});

export const actionShowForm = () => ({
	type: actions.FORM_SHOW,
});

export const actionHideForm = () => ({
	type: actions.FORM_HIDE,
});

export const actionIsUpdating = () => ({
	type: actions.FORM_IS_UPDATING,
});

export const actionIsCreating = () => ({
	type: actions.FORM_IS_CREATING,
});
