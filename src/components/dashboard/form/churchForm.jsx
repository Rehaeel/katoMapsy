import { useEffect, useRef, useState } from 'react';
import styles from './churchForm.module.css';
import { v4 as uuid } from 'uuid';

import { useDispatch } from 'react-redux';
import { actionChurchUpdate } from '../../../store/church/actionCreator';
import { actionHideForm } from '../../../store/form/actionCreator';
import { thunkChurchAdd } from '../../../store/church/thunks';

import Input from '../../input/input';
import close from '../../icons/close.svg';
import { useSelector } from 'react-redux';
import { selectForm } from '../../../store/selectors';
import Button from '../../button/button';
import { getMapCoords, getPlaceName } from '../../helpers/helperFunctions';
import { fetchMapCity } from '../../../store/services';

import HoursAdder from './hoursAdder/hoursAdder';
import HoursList from './hoursList/hoursList';

const ChurchForm = () => {
	const dispatch = useDispatch();
	const { currentChurch, isFormUpdating, showForm, currentHoursList } =
		useSelector(selectForm);

	const hasProperty = (prop) => currentChurch[prop] !== '';

	const [nameShrink, setNameShrink] = useState(hasProperty('name'));
	useEffect(() => {
		setNameShrink(hasProperty('name'));
	}, [currentChurch.name]);
	const [cityShrink, setCityShrink] = useState(hasProperty('city'));
	useEffect(() => {
		setCityShrink(hasProperty('city'));
	}, [currentChurch.city]);
	const [adressShrink, setAdressShrink] = useState(hasProperty('adress'));
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

	const [gotLink, setGotLink] = useState(false);

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
					getMapCoords(currentChurch.link)
				).then((res) => (cityRef.current.value = res));
			else cityRef.current.value = currentChurch.city;
		})();
		nameRef.current.value = isLinkPresent
			? getPlaceName(currentChurch.link)
			: currentChurch.name;
		adressRef.current.value = currentChurch.adress;
		websiteRef.current.value = currentChurch.website;
	}, [currentChurch]);

	const onLinkChangeHandler = (e) => {
		const linkValue = e.target.value;
		setGotLink(true);
		setNameShrink(true);
		setCityShrink(true);

		fetchMapCity(getMapCoords(linkValue)).then((res) => {
			cityRef.current.value = res;
		});
		nameRef.current.value = getPlaceName(linkValue);
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
			// hours: hoursRef.current.state.selectValue.map((val) => val.value),
		};

		console.log(church);

		// if (!isFormUpdating) church.id = uuid();
		// dispatch(thunkChurchAdd(church));

		// if (isFormUpdating) dispatch(actionChurchUpdate(church));
		// else return dispatch(thunkChurchAdd(church));

		// dispatch(actionHideForm());
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
				<Input
					labelText='Pinezka'
					required={true}
					helperText={
						<span>
							Link do pinezki map{' '}
							{hasProperty('link') ? (
								<a
									href={googleRef.current.value}
									alt='mapy google'
									target='_blank'>
									Google
								</a>
							) : (
								'Google'
							)}
						</span>
					}
					placeholder='Google Maps'
					thisRef={googleRef}
					shrink={googleShrink}
					setUnShrink={() =>
						googleRef.current.value !== '' || setGoogleShrink(false)
					}
					setShrink={() => setGoogleShrink(true)}
					onChange={onLinkChangeHandler}
				/>
				<Input
					labelText='Nazwa'
					required={true}
					helperText='Pełna nazwa parafii'
					placeholder='nazwa parafii'
					thisRef={nameRef}
					shrink={nameShrink}
					setUnShrink={() =>
						nameRef.current.value !== '' || setNameShrink(false)
					}
					setShrink={() => setNameShrink(true)}
					disabled={gotLink}
				/>

				<Input
					labelText='Adress'
					required={true}
					helperText='Pełen adress wraz numerem lokalu'
					placeholder='adress'
					thisRef={adressRef}
					shrink={adressShrink}
					setUnShrink={() =>
						adressRef.current.value !== '' || setAdressShrink(false)
					}
					setShrink={() => setAdressShrink(true)}
				/>
				<div className={styles['split-on-two']}>
					<Input
						labelText='Miasto'
						required={true}
						placeholder='miasto'
						helperText='miasto, nie diecezja'
						thisRef={cityRef}
						shrink={cityShrink}
						setUnShrink={() =>
							cityRef.current.value !== '' || setCityShrink(false)
						}
						setShrink={() => setCityShrink(true)}
						disabled={gotLink}
					/>
					<Input
						labelText='Strona parafii'
						helperText={
							<span>
								Link do{' '}
								{hasProperty('website') ? (
									<a
										href={websiteRef.current.value}
										alt='link do strony'
										target='_blank'>
										strony parafii
									</a>
								) : (
									'strony parafii'
								)}
								, najlepiej do zakładki o Mszach Świętych
							</span>
						}
						placeholder='strona parafii'
						thisRef={websiteRef}
						shrink={websiteShrink}
						setUnShrink={() =>
							websiteRef.current.value !== '' ||
							setWebsiteShrink(false)
						}
						setShrink={() => setWebsiteShrink(true)}
					/>
				</div>
				{isFormUpdating && currentChurch.hours.length > 0 && (
					<>
						<h3 className={styles['hours-list-header']}>
							godziny otwarcia
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
