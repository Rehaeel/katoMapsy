import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChurch } from '../../store/selectors';

import styles from './dashboard.module.css';

import { getMapCoords } from '../helpers/helperFunctions';
import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';

const Dashboard = () => {
	const churches = useSelector(selectChurch);

	const [markerPos, setMarkerPos] = useState(getMapCoords(churches[0].link));
	const [mapZoomLevel, setMapZoomLevel] = useState(6);

	return (
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
	);
};

export default Dashboard;
