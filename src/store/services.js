import axios from 'axios';

export const fetchUserResponse = async (user) =>
	await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/user`, {
		headers: user,
	});
