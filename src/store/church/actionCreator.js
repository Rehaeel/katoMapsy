import * as actions from './actionTypes';

export const actionChurchListSet = (churches) => ({
	type: actions.CHURCH_LIST_SET,
	payload: churches,
});

export const actionChurchAdd = (church) => ({
	type: actions.CHURCH_ADD,
	payload: church,
});

export const actionChurchUpdate = (church) => ({
	type: actions.CHURCH_UPDATE,
	payload: church,
});

export const actionChurchDelete = (churchId) => ({
	type: actions.CHURCH_DELETE,
	payload: churchId,
});
