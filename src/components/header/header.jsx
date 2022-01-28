import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import styles from './header.module.css';
import logo from '../icons/logo.svg';
import Button from '../button/button';
import { thunkLogoutUser } from '../../store/user/thunks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogoutHandler = () => {
		dispatch(thunkLogoutUser());
		navigate('/login');
	};
	return (
		<nav className={styles.header}>
			<img src={logo} alt='logo strony' />
			{user.isAuth && (
				<div className={styles.user}>
					<h3>Hejooo {user.name}</h3>
					<Button onClick={onLogoutHandler}>Wyloguj</Button>
				</div>
			)}
		</nav>
	);
};

export default Header;
