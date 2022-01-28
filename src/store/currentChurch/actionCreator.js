import * as actions from './actionTypes';

export const actionSetChurch = (church) => ({
	type: actions.CHURCH_SET,
	payload: church,
});
