import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChurch, selectForm } from '../../../store/selectors';
import { getMapCoords } from '../../helpers/helperFunctions';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { actionsetCurrMapPos } from '../../../store/form/actionCreator';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import styles from './map.module.css';

const myPin = new Icon({
	iconUrl: '/myPosPin.png',
	shadowUrl: '/shadow.png',
	iconSize: [25, 41],
	shadowAnchor: [15, 20],
});

const MapDisplay = () => {
	const dispatch = useDispatch();
	const churches = useSelector(selectChurch);
	const [userCurrPos, setUserCurrPos] = useState([]);
	const { currentChurch, zoom, mapPosition } = useSelector(selectForm);

	const [map, setMap] = useState();

	useEffect(() => {
		if (currentChurch.link !== '')
			dispatch(actionsetCurrMapPos(getMapCoords(currentChurch.link)));
	}, [currentChurch]);

	useEffect(() => {
		const success = (pos) =>
			setUserCurrPos([pos.coords.latitude, pos.coords.longitude]);

		const error = (err) => {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		const options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		};
		navigator.geolocation.getCurrentPosition(success, error, options);
	}, []);

	useEffect(() => {
		const options = {
			animate: true,
			duration: 0.8,
		};
		if (map) map.flyTo(mapPosition, zoom, options);
	}, [mapPosition, map]);

	return (
		<div className={styles.map} style={{ height: '100%', width: '100%' }}>
			<MapContainer
				center={mapPosition}
				zoom={zoom}
				whenCreated={setMap}
				fullscreenControl={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{userCurrPos.length > 0 && map && (
					<Marker position={userCurrPos} icon={myPin}>
						<Popup>Jesteś tutaj</Popup>
					</Marker>
				)}
				{churches.map((church) => {
					if (!church.link) return;
					return (
						<Marker
							key={church.id}
							position={getMapCoords(church.link)}
							riseOnHover={true}>
							<Popup>
								{church.name}
								{church.adress}
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
};

export default MapDisplay;
