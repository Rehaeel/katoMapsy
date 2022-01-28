import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as select from '../../store/selectors';

import styles from './dashboard.module.css';

import { getMapCoords } from '../helpers/helperFunctions';
import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';

const Dashboard = () => {
	const churches = useSelector(select.selectChurch);
	const user = useSelector(select.selectUser);
	// const church = useSelector(select.selectCurrentChurch);

	const [markerPos, setMarkerPos] = useState(getMapCoords(churches[0].link));
	const [mapZoomLevel, setMapZoomLevel] = useState(6);

	return user.isAuth ? (
		<section className={styles.dashboard}>
			<ChurchList
				setMapZoomLevel={setMapZoomLevel}
				setMarkerPos={setMarkerPos}
			/>
			<section className={styles.form}>
				<ChurchForm />
				<MapDisplay mapZoomLevel={mapZoomLevel} markerPos={markerPos} />
			</section>
		</section>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
