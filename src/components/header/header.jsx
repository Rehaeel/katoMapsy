import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import styles from './header.module.css';
import logo from '../logo/logo.svg';
import Button from '../button/button';
import { thunkLogoutUser } from '../../store/user/thunks';
import { useDispatch } from 'react-redux';

const Header = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const onLogoutHandler = () => {
		dispatch(thunkLogoutUser());
	};
	return (
		<nav className={styles.header}>
			<img src={logo} alt='logo strony' />
			<div className={styles.user}>
				<h3>Hejooo {user.name}</h3>
				<Button onClick={onLogoutHandler}>Wyloguj</Button>
			</div>
		</nav>
	);
};

export default Header;
