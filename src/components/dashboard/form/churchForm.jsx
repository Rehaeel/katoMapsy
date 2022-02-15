import { useEffect, useRef, useState } from 'react';
import styles from './churchForm.module.css';
import { v4 as uuid } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { actionHideForm } from '../../../store/form/actionCreator';
import { selectForm } from '../../../store/selectors';
import { fetchMapAdress, fetchMapCity } from '../../../store/services';
import * as thunks from '../../../store/church/thunks';

import close from '../../icons/close.svg';
import Button from '../../button/button';
import HoursList from './hoursList/hoursList';
import { GooglePin } from './inputs/pin';
import { WebsiteInput } from './inputs/website';
import { CityInput } from './inputs/city';
import { AdreesInput } from './inputs/adress';
import { NameInput } from './inputs/name';

import * as helperFunc from '../../helpers/helperFunctions';

const ChurchForm = () => {
	const dispatch = useDispatch();
	const { currentChurch, isFormUpdating, showForm, currentHoursList } =
		useSelector(selectForm);
	const [nameDisabled, setNameDisabled] = useState(false);

	const hasProperty = (prop) => currentChurch[prop] !== '';

	const [nameShrink, setNameShrink] = useState(hasProperty('name'));
	useEffect(() => {
		setNameShrink(hasProperty('name'));
	}, [currentChurch.name]);
	const [cityShrink, setCityShrink] = useState(hasProperty('city'));
	const [cityDisabled, setCityDisabled] = useState(false);
	useEffect(() => {
		setCityShrink(hasProperty('city'));
	}, [currentChurch.city]);
	const [adressShrink, setAdressShrink] = useState(hasProperty('adress'));
	const [adressDisabled, setAdressDisabled] = useState(false);
	useEffect(() => {
		setAdressShrink(hasProperty('adress'));
	}, [currentChurch.adress]);
	const [websiteShrink, setWebsiteShrink] = useState(hasProperty('website'));
	useEffect(() => {
		setWebsiteShrink(hasProperty('website'));
	}, [currentChurch.website]);
	const [googleShrink, setGoogleShrink] = useState(hasProperty('link'));
	useEffect(() => {
		setGoogleShrink(hasProperty('link'));
	}, [currentChurch.link]);

	const nameRef = useRef();
	const cityRef = useRef();
	const adressRef = useRef();
	const websiteRef = useRef();
	const googleRef = useRef();

	useEffect(() => {
		if (showForm && googleRef.current !== undefined)
			googleRef.current.focus();
	}, [showForm, googleRef]);

	useEffect(() => {
		googleRef.current.value = currentChurch.link;
		const isLinkPresent =
			googleRef.current.value !== '' &&
			googleRef.current.value !== undefined;

		if (isLinkPresent) setNameDisabled(true);
		else setNameDisabled(false);

		(async () => {
			if (isLinkPresent)
				return await fetchMapCity(
					helperFunc.getMapCoords(currentChurch.link)
				).then((res) => {
					if (res === undefined) return setCityDisabled(false);

					cityRef.current.value = res;
					setCityDisabled(true);
				});
			else cityRef.current.value = currentChurch.city;
		})();

		nameRef.current.value = isLinkPresent
			? helperFunc.getPlaceName(currentChurch.link)
			: currentChurch.name;
		adressRef.current.value = currentChurch.adress;
		websiteRef.current.value = currentChurch.website;
	}, [currentChurch]);

	const onLinkChangeHandler = (e) => {
		const linkValue = e.target.value;
		const mapCoords = helperFunc.getMapCoords(linkValue);
		if (mapCoords === 'ERROR') return;

		setNameDisabled(true);
		setNameShrink(true);
		setCityShrink(true);

		fetchMapCity(mapCoords).then((res) => {
			if (res === undefined) return setCityDisabled(false);

			cityRef.current.value = res;
			setCityDisabled(true);
		});
		nameRef.current.value = helperFunc.getPlaceName(linkValue);

		fetchMapAdress(mapCoords).then((res) => {
			if ('current' in adressRef) {
				setAdressDisabled(true);
				adressRef.current.value = `${res.road || res.village} ${
					res.house_number
				}`;
				setAdressShrink(true);
				if (adressRef.current.value.includes('undefined')) {
					adressRef.current.value =
						adressRef.current.value.replaceAll('undefined', '');
					setAdressDisabled(false);
				}
			}
		});
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const city = cityRef.current.value;

		const church = {
			...currentChurch,
			name,
			city,
			adress: adressRef.current.value,
			website: websiteRef.current.value,
			link: googleRef.current.value,
			hours: currentHoursList,
		};

		const alertMessage = helperFunc.churchFormAlertMessage(church);
		if (alertMessage !== undefined) return alert(alertMessage);

		if (!isFormUpdating) {
			church.id = uuid();
			dispatch(thunks.thunkChurchAdd(church));
		}
		if (isFormUpdating) {
			dispatch(thunks.thunkChurchUpdate(church));
		}

		nameRef.current.value = '';
		cityRef.current.value = '';
		adressRef.current.value = '';
		websiteRef.current.value = '';
		googleRef.current.value = '';
		setNameDisabled(false);
		dispatch(actionHideForm());
	};

	return (
		<div
			className={`${styles.form} ${showForm ? styles['show-form'] : ''}`}>
			<img
				src={close}
				alt='close form'
				onClick={() => dispatch(actionHideForm())}
			/>
			<h2>Formularz</h2>
			<form>
				<GooglePin
					googleRef={googleRef}
					googleShrink={googleShrink}
					hasProperty={hasProperty}
					setGoogleShrink={setGoogleShrink}
					onLinkChangeHandler={onLinkChangeHandler}
				/>
				<NameInput
					nameRef={nameRef}
					nameShrink={nameShrink}
					gotLink={nameDisabled}
					setNameShrink={setNameShrink}
				/>

				<AdreesInput
					adressRef={adressRef}
					adressShrink={adressShrink}
					adressDisabled={adressDisabled}
					setAdressShrink={setAdressShrink}
					setAdressDisabled={setAdressDisabled}
				/>
				<div className={styles['split-on-two']}>
					<CityInput
						cityRef={cityRef}
						cityShrink={cityShrink}
						cityDisabled={cityDisabled}
						setCityShrink={setCityShrink}
						setCityDisabled={setCityDisabled}
					/>
					<WebsiteInput
						websiteRef={websiteRef}
						websiteShrink={websiteShrink}
						setWebsiteShrink={setWebsiteShrink}
						hasProperty={hasProperty}
					/>
				</div>

				{currentHoursList[0] !== undefined &&
					currentHoursList[0].id !== '' && (
						<>
							<h3 className={styles['hours-list-header']}>
								Msze Święte
							</h3>
							<HoursList />
						</>
					)}
				<Button type='submit' onClick={onSubmitForm}>
					{isFormUpdating ? 'Aktualizuj' : 'Dodaj'}
				</Button>
			</form>
		</div>
	);
};

export default ChurchForm;
