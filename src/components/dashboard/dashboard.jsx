import { useSelector } from 'react-redux';
import * as select from '../../store/selectors';

import styles from './dashboard.module.css';

import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';
import HoursAdder from './form/hoursAdder/hoursAdder';
import { useEnterPressListener } from '../helpers/hooks';

const Dashboard = (props) => {
	const user = useSelector(select.selectUser);

	useEnterPressListener(props.showForm, props.searchRef);

	return user.isAuth ? (
		<section className={styles.dashboard}>
			<section className={styles.form}>
				<ChurchList
					churchlistRef={props.chruchlistRef}
					searchRef={props.searchRef}
				/>
				<ChurchForm />
			</section>
			<section className={styles['map-and-hours']}>
				<HoursAdder
					weekSelectRef={props.weekSelectRef}
					sundaySelectRef={props.sundaySelectRef}
				/>
				<MapDisplay />
			</section>
		</section>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
