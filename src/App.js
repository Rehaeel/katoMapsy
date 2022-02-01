import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import store from './store/store';
import { thunkFetchUser } from './store/user/thunks';

import FullWidthContainer from './components/helpers/fullWidthContainer';
import Login from './components/login/login';
import Registration from './components/register/registration';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import { actionHideForm } from './store/form/actionCreator';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (window.localStorage.getItem('token'))
			dispatch(thunkFetchUser(window.localStorage.getItem('token')));
		else if (
			window.location.pathname !== '/login' &&
			window.location.pathname !== '/register'
		)
			navigate('/login');

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') dispatch(actionHideForm());
		});
	}, []);

	console.log(store.getState());

	return (
		<>
			<Header />
			<FullWidthContainer isFullHeight={true}>
				<Routes>
					<Route exact path='/' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</FullWidthContainer>
		</>
	);
}

export default App;
