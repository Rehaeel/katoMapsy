import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChurch, selectForm } from '../../../store/selectors';

import styles from './map.module.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import greenIcon from '../../icons/leaflet-marker-green.svg';

import { getMapCoords } from '../../helpers/helperFunctions';
import * as hooks from '../../helpers/hooks';
import PopupHours from './popupHours';
import NameAndAdress from './nameAndAdress';

const markerPin = new L.Icon({
	iconUrl: greenIcon,
	iconAnchor: [13, 41],
	iconSize: [25, 41],
	shadowUrl: '/shadow.png',
	shadowAnchor: [15, 41],
	popupAnchor: [0, -20],
});

const MapDisplay = () => {
	const { list: churches } = useSelector(selectChurch);
	const { zoom, mapPosition } = useSelector(selectForm);

	const [mapDisplay, setMapDisplay] = useState(false);

	useEffect(() => {
		setMapDisplay(true);
		return () => setMapDisplay(false);
	}, []);

	const [map, setMap] = useState();

	hooks.useFetchChurches();
	hooks.useFetchAllDBChurches(map);
	hooks.useCurrMapPosition();
	// hooks.useSetCurrentUserPosition(map, zoom, mapPosition);
	hooks.useFlyTo(map, mapPosition, zoom);

	return (
		mapDisplay && (
			<div
				className={styles.map}
				style={{ height: '100%', width: '100%' }}>
				<MapContainer
					center={mapPosition}
					zoom={zoom}
					whenCreated={setMap}
					fullscreenControl={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
					/>
					{churches.map((church) => {
						if (church.link)
							return (
								<Marker
									key={church.id}
									position={getMapCoords(church.link)}
									icon={markerPin}
									riseOnHover={true}>
									<Popup>
										<NameAndAdress
											church={church}
											styles={styles}
										/>
										<PopupHours
											hours={church.hours}
											styles={styles}
										/>
									</Popup>
								</Marker>
							);
					})}
				</MapContainer>
			</div>
		)
	);
};

export default MapDisplay;
