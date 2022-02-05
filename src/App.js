import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import FullWidthContainer from './components/helpers/fullWidthContainer';
import Login from './components/login/login';
import Registration from './components/register/registration';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import { selectForm } from './store/selectors';
import * as hooks from './components/helpers/hooks';
import GoOnMobile from './components/dashboard/goOnMobile/goOnMobile';

function App() {
	const searchRef = useRef();
	const sundaySelectRef = useRef();
	const weekSelectRef = useRef();
	const chruchlistRef = useRef();

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
