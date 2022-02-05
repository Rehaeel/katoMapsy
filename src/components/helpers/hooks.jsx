import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionsetCurrMapPos } from '../../store/form/actionCreator';
import { selectChurch, selectForm, selectUser } from '../../store/selectors';
import { fetchAllChurches } from '../../store/services';
import { getMapCoords, getPlaceName } from './helperFunctions';
import L from 'leaflet';
import leafletMarker from '../icons/leaflet-marker.svg';
import { useNavigate } from 'react-router-dom';
import { thunkFetchUser } from '../../store/user/thunks';
import * as formActions from '../../store/form/actionCreator';
import { thunkFetchChurses } from '../../store/church/thunks';

///////////////////////////////////////////////////////////////

export const useScreenSizeListener = (setScreenSize) => {
	const windowResize = () => {
		setScreenSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', windowResize);

		return () => window.removeEventListener('resize', windowResize);
	}, []);
};

///////////////////////////////////////////////////////////////

export const useFetchChurches = () => {
	const dispatch = useDispatch();
	const { email } = useSelector(selectUser);

	useEffect(() => {
		if (email) dispatch(thunkFetchChurses());
	}, [email]);
};

///////////////////////////////////////////////////////////////

export const useCurrMapPosition = () => {
	const dispatch = useDispatch();
	const { currentChurch } = useSelector(selectForm);

	useEffect(() => {
		if (currentChurch.link !== '')
			dispatch(actionsetCurrMapPos(getMapCoords(currentChurch.link)));
	}, [currentChurch]);
};

///////////////////////////////////////////////////////////////

export const useSetCurrentUserPosition = (map, zoom, mapPosition) => {
	const [userPos, setUserPos] = useState();
	const [gotFlight, setGotFlight] = useState(false);

	useEffect(() => {
		const success = (pos) =>
			setUserPos([pos.coords.latitude, pos.coords.longitude]);

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
		const icon = new L.Icon({
			iconUrl: '/myPosPin.png',
			shadowUrl: '/shadow.png',
			iconSize: [25, 41],
			shadowAnchor: [15, 20],
			popupAnchor: [0, -20],
		});

		if (userPos) {
			const popup = L.popup({ icon })
				.setLatLng(userPos)
				.setContent(`<p class='my-position'>tu jesteś</p>`)
				.openOn(map);

			L.marker(userPos, { icon }).bindPopup(popup).openPopup().addTo(map);

			if (!gotFlight) {
				const flightOptions = { animate: true, duration: 0.8 };
				setTimeout(() => {
					setGotFlight(true);
					map.flyTo(userPos, 14, flightOptions);
				}, 1500);

				setTimeout(() => {
					map.flyTo(mapPosition, zoom, flightOptions);
				}, 3500);
			}
		}
	}, [userPos]);
};

///////////////////////////////////////////////////////////////

export const useFlyTo = (map, mapPosition, zoom) => {
	useEffect(() => {
		const options = {
			animate: true,
			duration: 0.8,
		};
		if (map) map.flyTo(mapPosition, zoom, options);
	}, [mapPosition, map]);
};

///////////////////////////////////////////////////////////////

export const useFetchAllDBChurches = (map) => {
	const churchList = useSelector(selectChurch);

	const icon = new L.Icon({
		iconUrl: leafletMarker,
		popupAnchor: [4, -40],
		iconAnchor: [-10, 40],
	});

	useEffect(() => {
		let markersList = [];
		if (map) {
			fetchAllChurches().then((res) => {
				const linksList = [...res.data].map((el) => el.link);
				if (churchList.isFetched) {
					linksList
						.filter(
							(link) =>
								churchList.list.find(
									(el) => el.link === link
								) === undefined
						)
						.map((link) => {
							const marker = L.marker(getMapCoords(link), {
								icon,
							}).bindPopup(
								`<p>${getPlaceName(link)}</p>
					<p class='grayed-out'>dodane przez innego użytkownika</p>`
							);
							marker.addTo(map);
							markersList.push(marker);
						});
				}
			});
		}
		return () => markersList.map((mark) => mark.removeFrom(map));
	}, [map, churchList]);
};

///////////////////////////////////////////////////////////////

export const useSearchStopPropagation = (searchRef) => {
	useEffect(() => {
		if (searchRef.current !== undefined)
			searchRef.current.addEventListener('keydown', (e) =>
				e.stopPropagation()
			);
	}, [searchRef]);
};

///////////////////////////////////////////////////////////////

export const useEnterPressListener = (showForm, searchRef) => {
	const dispatch = useDispatch();

	const onEnterClick = (e) => {
		if (
			searchRef.current !== document.activeElement &&
			!showForm &&
			e.code === 'Enter'
		) {
			e.preventDefault();
			dispatch(formActions.actionResetChurch());
			dispatch(formActions.actionShowForm());
			dispatch(formActions.actionShowCreateForm());
			dispatch(formActions.actionSetRangeIsNotUpdating());
			dispatch(formActions.actionResetCurrentRange());
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', onEnterClick);
		return () => document.removeEventListener('keydown', onEnterClick);
	}, [showForm]);
};

///////////////////////////////////////////////////////////////

export const useKeyPressListener = (weekSelectRef, searchRef) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const keyPressListener = (e) => {
		if (e.code === 'Escape') {
			dispatch(formActions.actionHideForm());
			if (searchRef.current !== undefined) searchRef.current.blur();
		}
		if (e.code === 'Slash') {
			e.preventDefault();
			searchRef.current.focus();
		}

		if (e.altKey && e.code === 'KeyH') weekSelectRef.current.focus();
	};

	useEffect(() => {
		if (window.localStorage.getItem('token'))
			dispatch(thunkFetchUser(window.localStorage.getItem('token')));
		else if (
			window.location.pathname !== '/login' &&
			window.location.pathname !== '/register'
		)
			navigate('/login');
		document.addEventListener('keydown', keyPressListener);
	}, []);
};

///////////////////////////////////////////////////////////////

export const useSetRangeValues = (props) => {
	useEffect(() => {
		if (
			props.currentRange.holySundays[0] === '' &&
			props.currentRange.weekdays[0] === ''
		) {
			return props.init();
		}

		props.setSundayValue(
			props.currentRange.holySundays.map((hour) => ({
				value: hour,
				label: hour,
			}))
		);
		props.setWeekValue(
			props.currentRange.weekdays.map((hour) => ({
				value: hour,
				label: hour,
			}))
		);

		if (props.currentRange.interval !== true) {
			props.setIsFullYear(false);
			props.setShowDatePicker(true);
			const rangeArr = props.currentRange.interval.split('-');
			const startDate = new Date(
				new Date().getFullYear(),
				rangeArr[0].split('.')[1] - 1,
				rangeArr[0].split('.')[0]
			);
			const endDate = new Date(
				new Date().getFullYear(),
				rangeArr[1].split('.')[1] - 1,
				rangeArr[1].split('.')[0]
			);
			const { key } = props.initialSelection[0];

			props.setSelection([{ startDate, endDate, key }]);
		} else {
			props.setIsFullYear(true);
			props.setShowDatePicker(false);
		}
	}, [props.currentRange]);
};
