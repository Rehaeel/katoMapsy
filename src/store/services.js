import axios from 'axios';

export const fetchLogInUser = async (user) =>
	await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/user`, {
		headers: user,
	});

export const fetchUser = async (token) =>
	await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/user/${token}`);

export const fetchUserCreate = async (user) =>
	await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/user`, user);

export const fetchMapCity = async (coords) =>
	await axios
		.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`
		)
		.then((res) => res.data.address.county);
