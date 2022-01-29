import { actionChurchAdd } from './actionCreator';

export const thunkChurchAdd = (church) => (dispatch, getState) => {
	const curChurch = { ...church, contributor: getState().user.email };
	dispatch(actionChurchAdd(curChurch));
};
