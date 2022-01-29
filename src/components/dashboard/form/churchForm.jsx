import { useEffect, useRef, useState } from 'react';
import styles from './churchForm.module.css';
import { v4 as uuid } from 'uuid';

import { useDispatch } from 'react-redux';
import { actionChurchUpdate } from '../../../store/church/actionCreator';
import { actionHideForm } from '../../../store/form/actionCreator';
import { thunkChurchAdd } from '../../../store/church/thunks';

import Input from '../../input/input';
import { useSelector } from 'react-redux';
import { selectForm } from '../../../store/selectors';
import Button from '../../button/button';

const ChurchForm = () => {
	const dispatch = useDispatch();
	const { showForm } = useSelector(selectForm);
	const { currentChurch } = useSelector(selectForm);
	const { isUpdating } = useSelector(selectForm);

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

	useEffect(() => {
		nameRef.current.value = currentChurch.name;
		cityRef.current.value = currentChurch.city;
		adressRef.current.value = currentChurch.adress;
		websiteRef.current.value = currentChurch.website;
		googleRef.current.value = currentChurch.link;
	}, [currentChurch]);

	const nameRef = useRef();
	const cityRef = useRef();
	const adressRef = useRef();
	const websiteRef = useRef();
	const googleRef = useRef();

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
		};

		if (!isUpdating) church.id = uuid();
		dispatch(thunkChurchAdd(church));

		if (isUpdating) dispatch(actionChurchUpdate(church));
		else return dispatch(thunkChurchAdd(church));

		dispatch(actionHideForm());
	};

	return (
		<div className={styles.form}>
			<div style={{ marginTop: showForm ? '0' : '-100%' }}>
				<h1>Formularz</h1>
				<form>
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
					/>
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
					/>
					<Input
						labelText='Adress'
						required={true}
						helperText='Pełen adress wraz numerem lokalu'
						placeholder='adress'
						thisRef={adressRef}
						shrink={adressShrink}
						setUnShrink={() =>
							adressRef.current.value !== '' ||
							setAdressShrink(false)
						}
						setShrink={() => setAdressShrink(true)}
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
							googleRef.current.value !== '' ||
							setGoogleShrink(false)
						}
						setShrink={() => setGoogleShrink(true)}
					/>
					<Button type='submit' onClick={onSubmitForm}>
						{isUpdating ? 'Aktualizuj' : 'Dodaj'}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ChurchForm;
