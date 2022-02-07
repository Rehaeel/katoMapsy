import { useRef, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectForm } from './store/selectors';
import { thunkFetchUser, thunkLogoutUser } from './store/user/thunks';

import FullWidthContainer from './components/helpers/fullWidthContainer';
import Login from './components/login/login';
import Registration from './components/register/registration';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import GoOnMobile from './components/dashboard/goOnMobile/goOnMobile';

import * as hooks from './components/helpers/hooks';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchRef = useRef();
	const sundaySelectRef = useRef();
	const weekSelectRef = useRef();
	const chruchlistRef = useRef();

	useEffect(() => {
		if (window.localStorage.getItem('token'))
			dispatch(
				thunkFetchUser(window.localStorage.getItem('token'))
			).catch(() => {
				dispatch(thunkLogoutUser());
				navigate('/login');
			});
		else navigate('/login');
	}, []);

	const { showForm } = useSelector(selectForm);

	const [screenSize, setScreenSize] = useState(window.innerWidth);
	hooks.useScreenSizeListener(setScreenSize);

	hooks.useKeyPressListener(weekSelectRef, searchRef);
	hooks.useSearchStopPropagation(searchRef);

	return screenSize < 1024 ? (
		<GoOnMobile />
	) : (
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
								sundaySelectRef={sundaySelectRef}
								chruchlistRef={chruchlistRef}
								showForm={showForm}
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
