import { useEffect, useRef, useState } from 'react';
import styles from './churchForm.module.css';
import { v4 as uuid } from 'uuid';

import { useDispatch } from 'react-redux';
import { actionHideForm } from '../../../store/form/actionCreator';
import * as thunks from '../../../store/church/thunks';

import close from '../../icons/close.svg';
import { useSelector } from 'react-redux';
import { selectForm } from '../../../store/selectors';
import Button from '../../button/button';
import * as helperFunc from '../../helpers/helperFunctions';
import { fetchMapAdress, fetchMapCity } from '../../../store/services';

import HoursList from './hoursList/hoursList';
import { GooglePin } from './inputs/pin';
import { WebsiteInput } from './inputs/website';
import { CityInput } from './inputs/city';
import { AdreesInput } from './inputs/adress';
import { NameInput } from './inputs/name';

const ChurchForm = () => {
	const dispatch = useDispatch();
	const { currentChurch, isFormUpdating, showForm, currentHoursList } =
		useSelector(selectForm);
	const [gotLink, setGotLink] = useState(false);

	const hasProperty = (prop) => currentChurch[prop] !== '';

	const [nameShrink, setNameShrink] = useState(hasProperty('name'));
	useEffect(() => {
		setNameShrink(hasProperty('name'));
	}, [currentChurch.name, hasProperty]);
	const [cityShrink, setCityShrink] = useState(hasProperty('city'));
	useEffect(() => {
		setCityShrink(hasProperty('city'));
	}, [currentChurch.city, hasProperty]);
	const [adressShrink, setAdressShrink] = useState(hasProperty('adress'));
	useEffect(() => {
		setAdressShrink(hasProperty('adress'));
	}, [currentChurch.adress, hasProperty]);
	const [websiteShrink, setWebsiteShrink] = useState(hasProperty('website'));
	useEffect(() => {
		setWebsiteShrink(hasProperty('website'));
	}, [currentChurch.website, hasProperty]);
	const [googleShrink, setGoogleShrink] = useState(hasProperty('link'));
	useEffect(() => {
		setGoogleShrink(hasProperty('link'));
	}, [currentChurch.link, hasProperty]);

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

		if (isLinkPresent) setGotLink(true);
		else setGotLink(false);

		(async () => {
			if (isLinkPresent)
				return await fetchMapCity(
					helperFunc.getMapCoords(currentChurch.link)
				).then((res) => (cityRef.current.value = res));
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

		setGotLink(true);
		setNameShrink(true);
		setCityShrink(true);

		fetchMapCity(mapCoords).then((res) => {
			cityRef.current.value = res;
		});
		nameRef.current.value = helperFunc.getPlaceName(linkValue);

		fetchMapAdress(mapCoords).then((res) => {
			if (adressRef.current !== undefined) {
				adressRef.current.value = `${res.road || res.village} ${
					res.house_number
				}`;
				setAdressShrink(true);
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
		setGotLink(false);
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
					hasProperty={hasProperty}
					setGoogleShrink={setGoogleShrink}
					googleShrink={googleShrink}
					onLinkChangeHandler={onLinkChangeHandler}
				/>
				<NameInput
					nameRef={nameRef}
					nameShrink={nameShrink}
					setNameShrink={setNameShrink}
					gotLink={gotLink}
				/>

				<AdreesInput
					adressRef={adressRef}
					adressShrink={adressShrink}
					gotLink={gotLink}
					setAdressShrink={setAdressShrink}
				/>
				<div className={styles['split-on-two']}>
					<CityInput
						gotLink={gotLink}
						cityRef={cityRef}
						setCityShrink={setCityShrink}
						cityShrink={cityShrink}
					/>
					<WebsiteInput
						setWebsiteShrink={setWebsiteShrink}
						websiteRef={websiteRef}
						websiteShrink={websiteShrink}
						hasProperty={hasProperty}
					/>
				</div>

				{currentHoursList[0].id !== '' && (
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
