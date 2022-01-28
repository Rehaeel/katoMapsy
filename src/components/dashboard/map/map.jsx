import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectChurch } from '../../../store/selectors';
import { getMapCoords } from '../../helpers/helperFunctions';

const Map = ({ center, zoom }) => {
	const map = useMap();
	map.flyTo(center, zoom, {
		animate: true,
		duration: 0.8,
	});
	return null;
};

const MapDisplay = ({ markerPos, mapZoomLevel }) => {
	const churches = useSelector(selectChurch);

	return (
		<MapContainer center={markerPos} zoom={mapZoomLevel}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Map center={markerPos} zoom={mapZoomLevel} />
			{churches.map((church) => (
				<Marker key={church.id} position={getMapCoords(church.link)}>
					<Popup>some simple html</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default MapDisplay;
