import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';

import styles from './dashboard.module.css';

import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';
import HoursAdder from './form/hoursAdder/hoursAdder';
import Introduction from './introduction/introduction';

import * as hooks from '../helpers/hooks';

const Dashboard = (props) => {
	const user = useSelector(selectUser);
	const churchSubmitRef = useRef();
	const addHoursBtnRef = useRef();

	const [intro, setIntro] = useState();

	useEffect(() => {
		if (user.showIntro) setIntro(<Introduction />);
		return () => setIntro();
	}, [user.showIntro]);

	hooks.useEnterPressListener(props.showForm, props.searchRef);
	hooks.useSubmitChurchFormKeyListeners(
		churchSubmitRef,
		addHoursBtnRef,
		props.weekSelectRef,
		props.sundaySelectRef
	);

	return user.isAuth ? (
		<>
			{intro}
			<section className={styles.dashboard}>
				<section className={styles.form}>
					<ChurchList
						churchlistRef={props.chruchlistRef}
						searchRef={props.searchRef}
					/>
					<ChurchForm churchSubmitRef={churchSubmitRef} />
				</section>
				<section className={styles['map-and-hours']}>
					<HoursAdder
						weekSelectRef={props.weekSelectRef}
						sundaySelectRef={props.sundaySelectRef}
						addHoursBtnRef={addHoursBtnRef}
					/>
					<MapDisplay />
				</section>
			</section>
		</>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
