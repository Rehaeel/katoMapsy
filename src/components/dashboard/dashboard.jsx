import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as select from '../../store/selectors';

import styles from './dashboard.module.css';

import { getMapCoords } from '../helpers/helperFunctions';
import ChurchList from './churchList/list/churchList';
import ChurchForm from './form/churchForm';
import MapDisplay from './map/map';
import SpinningWheel from '../helpers/spinningWheel';

const Dashboard = () => {
	const user = useSelector(select.selectUser);
	const [showForm, setShowForm] = useState(false);

	const [mapPosition, setMapPosition] = useState([51.919437, 19.145136]);
	const [mapZoomLevel, setMapZoomLevel] = useState(7);

	return user.isAuth ? (
		<section className={styles.dashboard}>
			<ChurchList
				setMapZoomLevel={setMapZoomLevel}
				setMarkerPos={setMapPosition}
				showForm={setShowForm}
			/>
			<section className={styles.details}>
				<ChurchForm showForm={showForm} />
				<MapDisplay
					mapZoomLevel={mapZoomLevel}
					position={mapPosition}
				/>
			</section>
		</section>
	) : (
		<SpinningWheel />
	);
};

export default Dashboard;
