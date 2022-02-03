import { fetchAllUserChurches, fetchChurchIntoDB } from '../services';
import { actionChurchAdd, actionChurchListSet } from './actionCreator';

export const thunkChurchAdd = (church) => async (dispatch, getState) => {
	const curChurch = { ...church, contributor: getState().user.email };
	return await fetchChurchIntoDB(curChurch)
		.then(() => {
			dispatch(actionChurchAdd(curChurch));
		})
		.catch(() => setTimeout(() => alert('kościół jest już w bazie'), 500));
};

export const thunkFetchChurses = () => (dispatch, getState) => {
	const { email } = getState().user;
	fetchAllUserChurches(email).then((res) => {
		const churchList = res.data.map((church) => ({
			...church,
			hours: JSON.parse(church.hours),
		}));
		dispatch(actionChurchListSet(churchList));
	});
};
