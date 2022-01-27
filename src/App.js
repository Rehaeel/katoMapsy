import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import store from './store/store';
import { thunkFetchUser } from './store/user/thunks';

import './App.css';
import FullWidthContainer from './components/helpers/fullWidthContainer';
import Login from './components/login/login';
import Registration from './components/register/registration';
import Header from './components/header/header';
import SpinningWheel from './components/helpers/spinningWheel';

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
	}, []);

	console.log(store.getState().user);

	return (
		<>
			<Header />
			<FullWidthContainer isFullHeight={true}>
				{/* <SpinningWheel /> */}
				<Routes>
					<Route exact path='/' element='' />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</FullWidthContainer>
		</>
	);
}

export default App;
