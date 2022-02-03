import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { thunkFetchUser } from './store/user/thunks';

import FullWidthContainer from './components/helpers/fullWidthContainer';
import Login from './components/login/login';
import Registration from './components/register/registration';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import { actionHideForm } from './store/form/actionCreator';
import { selectUser } from './store/selectors';
import { thunkFetchChurses } from './store/church/thunks';
import * as formActions from './store/form/actionCreator';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchRef = useRef();
	const { email } = useSelector(selectUser);

	useEffect(() => {
		if (email) dispatch(thunkFetchChurses());
	}, [email]);

	const weekSelectRef = useRef();

	const keyPressListener = (e) => {
		if (e.code === 'Escape') {
			dispatch(actionHideForm());
			if (searchRef.current !== undefined) searchRef.current.blur();
		}
		if (e.code === 'Slash') {
			e.preventDefault();
			searchRef.current.focus();
		}
		if (
			searchRef.current !== document.activeElement &&
			e.code === 'Enter'
		) {
			e.preventDefault();
			dispatch(formActions.actionResetChurch());
			dispatch(formActions.actionShowForm());
			dispatch(formActions.actionShowCreateForm());
			dispatch(formActions.actionSetRangeIsNotUpdating());
			dispatch(formActions.actionResetCurrentRange());
		}
		if (e.altKey && e.code === 'KeyH') weekSelectRef.current.focus();
	};

	useEffect(() => {
		if (window.localStorage.getItem('token'))
			dispatch(thunkFetchUser(window.localStorage.getItem('token')));
		else if (
			window.location.pathname !== '/login' &&
			window.location.pathname !== '/register'
		)
			navigate('/login');
		document.addEventListener('keydown', keyPressListener);
	}, []);

	useEffect(() => {
		if (searchRef.current !== undefined)
			searchRef.current.addEventListener('keydown', (e) =>
				e.stopPropagation()
			);
	}, [searchRef]);

	return (
		<>
			<Header />
			<FullWidthContainer isFullHeight={true}>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<Dashboard
								searchRef={searchRef}
								weekSelectRef={weekSelectRef}
							/>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</FullWidthContainer>
		</>
	);
}

export default App;
