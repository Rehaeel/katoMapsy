import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as select from '../../store/selectors';

import styles from './dashboard.module.css';

import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';

const Dashboard = () => {
	const user = useSelector(select.selectUser);
	const [showForm, setShowForm] = useState(false);

	return user.isAuth ? (
		<section className={styles.dashboard}>
			<ChurchList showForm={setShowForm} />
			<section className={styles.details}>
				<ChurchForm showForm={showForm} />
				<MapDisplay />
			</section>
		</section>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
