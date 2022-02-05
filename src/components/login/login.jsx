import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import sha256 from 'sha256';
import { thunkLoginUser, thunkFetchUser } from '../../store/user/thunks';

import Button from '../button/button';
import Input from '../input/input';
import styles from './login.module.css';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [wrongInput, setWrongInput] = useState();

	const [emailShrink, setEmailShrink] = useState(false);
	const [passwordShrink, setPasswordShrink] = useState(false);

	const onSubmitHanddler = (e) => {
		e.preventDefault();

		const user = {
			email: emailRef.current.value,
			password: sha256(passwordRef.current.value),
		};
		dispatch(thunkLoginUser(user))
			.then((token) => {
				setWrongInput(false);
				emailRef.current.value = passwordRef.current.value = '';
				return token.token;
			})
			.then((token) => {
				dispatch(thunkFetchUser(token));
				navigate('/');
			})
			.catch((err) => {
				setWrongInput(true);
				emailRef.current.focus();
				if (err.response.status === 400) alert(err.response.data);
			});
	};

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	return (
		<>
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
						emailRef.current.value !== '' || setEmailShrink(false)
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
				Nie masz konta? <Link to='/register'>Zarejestruj się</Link>
			</p>
		</>
	);
};

export default Login;
