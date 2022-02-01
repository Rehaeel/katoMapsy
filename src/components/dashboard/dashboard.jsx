import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as select from '../../store/selectors';

import styles from './dashboard.module.css';

import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';
import HoursAdder from './form/hoursAdder/hoursAdder';

const Dashboard = () => {
	const user = useSelector(select.selectUser);
	const [showForm, setShowForm] = useState(false);

	return user.isAuth ? (
		<section className={styles.dashboard}>
			<section className={styles.form}>
				<ChurchList showForm={setShowForm} />
				<ChurchForm showForm={showForm} />
			</section>
			<section className={styles['map-and-hours']}>
				<HoursAdder />
				<MapDisplay />
			</section>
		</section>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
