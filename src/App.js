import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectUser } from './store/selectors';
import { getUserThunk } from './store/user/thunks';
import store from './store/store';
import { useEffect } from 'react';
import { actionSetUser } from './store/user/actionCreator';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (window.localStorage.getItem('name'))
			return dispatch(actionSetUser(window.localStorage.getItem('name')));

		const headersToFetch = {
			userName: 'rafal_pro',
			password: 'password',
		};

		dispatch(getUserThunk(headersToFetch));
	}, []);

	return <h1>Hello {user.name}</h1>;
}

export default App;
