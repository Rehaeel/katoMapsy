import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectChurch } from '../../../store/selectors';
import { getMapCoords } from '../../helpers/helperFunctions';
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

const MapDisplay = ({ position, mapZoomLevel }) => {
	const churches = useSelector(selectChurch);
	const [renderCurPos, setRenderCurPos] = useState();
	const [currPos, setCurrPos] = useState([]);

	useEffect(() => {
		const success = (pos) =>
			setCurrPos([pos.coords.latitude, pos.coords.longitude]);

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
		if (currPos.length > 0)
			setRenderCurPos(
				<Marker position={currPos} icon={myPin}>
					Jesteś tutaj
				</Marker>
			);
	}, [currPos]);

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<MapContainer center={position} zoom={mapZoomLevel}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<Map center={position} zoom={mapZoomLevel} />
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
