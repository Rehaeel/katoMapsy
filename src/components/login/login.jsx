import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { thunkLoginUser, thunkFetchUser } from '../../store/user/thunks';

import sha256 from 'sha256';

import Button from '../button/button';
import Input from '../input/input';
import styles from './login.module.css';
import SpinningWheel from '../helpers/spinningWheel';

let user = {};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [wrongInput, setWrongInput] = useState();

	const [emailShrink, setEmailShrink] = useState(false);
	const [passwordShrink, setPasswordShrink] = useState(false);

	const [showSpinner, setShowSpinner] = useState(false);

	const onSubmitHanddler = (e) => {
		e.preventDefault();
		setShowSpinner(true);

		user = {
			email: emailRef.current.value,
			password: sha256(passwordRef.current.value),
		};

		dispatch(thunkLoginUser(user))
			.then((token) => {
				setWrongInput(false);

				return token.token;
			})
			.then((token) => {
				dispatch(thunkFetchUser(token));
				navigate('/');
				setShowSpinner(false);
			})
			.catch((err) => {
				setShowSpinner(false);
				setWrongInput(true);
				if ('current' in emailRef) emailRef.current.focus();
				if (err.response.status === 400) alert(err.response.data);
			});
	};

	const slashPressedHandler = (e) => {
		if (e.code === 'Slash') emailRef.current.focus();
	};

	useEffect(() => {
		emailRef.current.focus();
		document.addEventListener('keydown', slashPressedHandler);
		return () =>
			document.removeEventListener('keydown', slashPressedHandler);
	}, []);

	return (
		<>
			{showSpinner ? (
				<SpinningWheel />
			) : (
				<>
					{' '}
					<h1>Lognij się ino</h1>
					<form
						className={`${styles.login} vertical-flex`}
						onSubmit={onSubmitHanddler}>
						<Input
							labelText='email'
							type='email'
							placeholder='email'
							thisRef={emailRef}
							error={wrongInput}
							required={true}
							shrink={emailShrink}
							setUnShrink={() =>
								emailRef.current.value !== '' ||
								setEmailShrink(false)
							}
							setShrink={() => setEmailShrink(true)}
						/>
						<Input
							labelText='hasło'
							type='password'
							placeholder='hasło'
							thisRef={passwordRef}
							error={wrongInput}
							required={true}
							shrink={passwordShrink}
							setUnShrink={() =>
								passwordRef.current.value !== '' ||
								setPasswordShrink(false)
							}
							setShrink={() => setPasswordShrink(true)}
						/>

						<Button type='submit'>Wskakuj !</Button>
					</form>
					<p className={styles.registration}>
						Nie masz konta?{' '}
						<Link to='/register'>Zarejestruj się</Link>
					</p>{' '}
				</>
			)}
		</>
	);
};

export default Login;
