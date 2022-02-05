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

export const fetchMapAdress = async (coords) =>
	await axios
		.get(
			`https://eu1.locationiq.com/v1/reverse.php?key=pk.31b9536799e300f1a43445ef6d2935e1&lat=${coords[0]}&lon=${coords[1]}&format=json`
		)
		.then((res) => res.data.address);

export const fetchChurchIntoDB = async (church) =>
	await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/church`, church);

export const fetchChurchUpdate = async (church) =>
	await axios
		.post(
			`${process.env.REACT_APP_ENDPOINT_URL}/church/${church.id}`,
			church
		)
		.then((res) => res.data);

export const fetchAllUserChurches = async (email) =>
	await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/church`, {
		headers: { email: email },
	});

export const fetchAllChurches = async () =>
	await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/churches/all`);
