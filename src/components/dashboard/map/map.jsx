import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChurch, selectForm } from '../../../store/selectors';
import { getMapCoords } from '../../helpers/helperFunctions';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon, L } from 'leaflet';

const myPin = new Icon({
	iconUrl: '/myPosPin.png',
	shadowUrl: '/shadow.png',
	iconSize: [25, 41],
	shadowAnchor: [15, 20],
});

const Map = ({ center, zoom }) => {
	const map = useMap();
	map.flyTo(center, zoom, {
		animate: true,
		duration: 0.8,
	});
	return null;
};

const MapDisplay = () => {
	const churches = useSelector(selectChurch);
	const [renderCurPos, setRenderCurPos] = useState();
	const [userCurrPos, setUserCurrPos] = useState([]);
	const { currentChurch, zoom } = useSelector(selectForm);
	const [mapPosition, setMapPosition] = useState([51.919437, 19.145136]);

	useEffect(() => {
		if (currentChurch.link !== '')
			setMapPosition(getMapCoords(currentChurch.link));
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
		if (userCurrPos.length > 0)
			setRenderCurPos(
				<Marker position={userCurrPos} icon={myPin}>
					<Popup>Jesteś tutaj</Popup>
				</Marker>
			);
	}, [userCurrPos]);

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<MapContainer center={mapPosition} zoom={zoom}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<Map center={mapPosition} zoom={zoom} />
				{churches.map((church) => {
					if (!church.link) return;
					return (
						<Marker
							key={church.id}
							position={getMapCoords(church.link)}>
							<Popup>some simple html</Popup>
						</Marker>
					);
				})}
				{renderCurPos}
			</MapContainer>
		</div>
	);
};

export default MapDisplay;
