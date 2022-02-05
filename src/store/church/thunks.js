import * as services from '../services';
import * as actions from './actionCreator';

/////////////////////////////////////////////////////////////

export const thunkChurchAdd = (church) => async (dispatch, getState) => {
	const curChurch = { ...church, contributor: getState().user.email };
	return await services
		.fetchChurchIntoDB(curChurch)
		.then(() => {
			dispatch(actions.actionChurchAdd(curChurch));
		})
		.catch(() => setTimeout(() => alert('kościół jest już w bazie'), 500));
};

/////////////////////////////////////////////////////////////

export const thunkChurchUpdate = (church) => async (dispatch, _) => {
	dispatch(actions.actionChurchUpdate(church));
	return await services.fetchChurchUpdate(church);
};

/////////////////////////////////////////////////////////////

export const thunkFetchChurses = () => (dispatch, getState) => {
	const { email } = getState().user;
	services.fetchAllUserChurches(email).then((res) => {
		const churchList = res.data.map((church) => ({
			...church,
			hours: JSON.parse(church.hours),
		}));
		dispatch(actions.actionChurchListSet(churchList));
	});
};
