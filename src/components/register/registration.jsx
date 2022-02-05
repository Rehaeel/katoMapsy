import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateUser } from '../../store/user/thunks';

import styles from './registration.module.css';

import Button from '../button/button';
import Input from '../input/input';
import sha256 from 'sha256';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [wrongEmail, setWrongEmail] = useState(false);

	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();

	const [nameShrink, setNameShrink] = useState(false);
	const [emailShrink, setEmailShrink] = useState(false);
	const [passwordShrink, setPasswordShrink] = useState(false);

	const onSubmitHanddler = (e) => {
		e.preventDefault();
		const user = {
			email: emailRef.current.value,
			password: sha256(passwordRef.current.value),
			name: nameRef.current.value,
		};
		dispatch(thunkCreateUser(user))
			.then(() => {
				emailRef.current.value = '';
				passwordRef.current.value = '';
				nameRef.current.value = '';
				navigate('/');
			})
			.catch((err) => {
				setWrongEmail(true);
				if (err.response.status === 400) alert(err.response.data);
			});
	};

	return (
		<>
			<h1>Nie masz konta? Załóż!</h1>
			<form
				className={`${styles.login} vertical-flex`}
				onSubmit={onSubmitHanddler}>
				<Input
					labelText='imię'
					placeholder='imię'
					thisRef={nameRef}
					required={true}
					error={wrongEmail}
					shrink={nameShrink}
					setUnShrink={() =>
						nameRef.current.value !== '' || setNameShrink(false)
					}
					setShrink={() => setNameShrink(true)}
				/>
				<Input
					labelText='email'
					placeholder='email'
					thisRef={emailRef}
					required={true}
					error={wrongEmail}
					shrink={emailShrink}
					setUnShrink={() =>
						emailRef.current.value !== '' || setEmailShrink(false)
					}
					setShrink={() => setEmailShrink(true)}
				/>
				<Input
					labelText='hasło'
					type='password'
					placeholder='hasło'
					thisRef={passwordRef}
					required={true}
					error={wrongEmail}
					shrink={passwordShrink}
					setUnShrink={() =>
						emailRef.current.value !== '' ||
						setPasswordShrink(false)
					}
					setShrink={() => setPasswordShrink(true)}
				/>

				<Button type='submit'>Wskakuj !</Button>
			</form>
			<p className={styles.registration}>
				Masz konto? <Link to='/login'>Zaloguj się</Link>
			</p>
		</>
	);
};

export default Registration;
