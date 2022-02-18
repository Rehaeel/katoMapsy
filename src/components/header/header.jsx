import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectChurch } from '../../store/selectors';
import { actionUserShowIntro } from '../../store/user/actionCreator';
import { thunkLogoutUser } from '../../store/user/thunks';

import styles from './header.module.css';

import logo from '../icons/logo.svg';
import Button from '../button/button';

import { useNavigate } from 'react-router-dom';

import logout from '../icons/log-out.svg';
import Shortcuts from './shortcuts';
import github from '../icons/code.svg';
import intro from '../icons/comment.svg';

const Header = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { list: churches } = useSelector(selectChurch);

	const onLogoutHandler = () => {
		dispatch(thunkLogoutUser());
		navigate('/login');
	};

	return (
		<nav className={styles.header}>
			<div className={styles.icons}>
				<div className={styles.helpers}>
					<div className={styles.github}>
						<img
							src={github}
							alt='kod źródłowy'
							onClick={() =>
								window.open(
									'https://github.com/Rehaeel/katoMapsy',
									'_blank'
								)
							}
						/>
					</div>
					<Shortcuts styles={styles} />
					<div className={styles.intro}>
						<img
							src={intro}
							alt='filmik instruktażowy'
							onClick={() => {
								dispatch(actionUserShowIntro());
							}}
						/>
					</div>
				</div>
				<img src={logo} alt='logo strony' className={styles.logo} />
			</div>

			{user.isAuth && (
				<>
					<h2>
						Kościoły dodane przez Ciebie
						<span>: {churches.length}</span>
					</h2>
					<div className={styles.user}>
						<h3>Hejooo {user.name}</h3>
						<Button onClick={onLogoutHandler}>
							Wyloguj{' '}
							<img
								src={logout}
								alt='logout'
								className={styles.logout}
							/>
						</Button>
					</div>
				</>
			)}
		</nav>
	);
};

export default Header;
