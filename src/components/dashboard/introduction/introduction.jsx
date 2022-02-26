import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionUserHideIntro } from '../../../store/user/actionCreator';

import styles from './introduction.module.css';

import { Checkbox, FormControlLabel } from '@mui/material';
import Portal from '../../portal/portal';
import close from '../../icons/close.svg';

const Introduction = () => {
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(
		Boolean(window.localStorage.getItem('hideIntro'))
	);

	useEffect(() => {
		const keyHandler = (e) => {
			if (e.code === 'Escape') dispatch(actionUserHideIntro());
		};

		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	}, []);

	useEffect(() => {
		window.localStorage.getItem('hideIntro')
			? setChecked(true)
			: setChecked(false);
	}, [window.localStorage]);

	const checkboxHandler = (e) => {
		if (e.target.checked) {
			dispatch(actionUserHideIntro());
			window.localStorage.setItem('hideIntro', 'true');
			setChecked(true);
		} else {
			window.localStorage.removeItem('hideIntro');
			setChecked(false);
		}
	};

	return (
		<Portal>
			<div
				className={styles.backdrop}
				onClick={() => dispatch(actionUserHideIntro())}></div>
			<div className={styles.content}>
				<div className={styles.intro}>
					<p>[esc]</p>
					<img
						src={close}
						alt='zamknij okienko'
						className={styles.close}
						onClick={() => dispatch(actionUserHideIntro())}
					/>
					<h1>Intro</h1>
					<p>
						Zapraszam Cię do filmiku instruktażowego, by zobaczyć
						możliwości platformy i użyć pełnego potencjału
						aplikacji. Zapraszam!
					</p>
					<iframe
						width='540'
						height='315'
						src='https://www.youtube.com/embed/5grGgPw21wo'
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen></iframe>

					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={checkboxHandler}
								value={checked}
								sx={{
									color: 'var(--cl-light)',
									'&.Mui-checked': {
										color: 'var(--cl-light)',
									},
								}}
							/>
						}
						label='nie pokazuj przy włączaniu'
					/>
				</div>
			</div>
		</Portal>
	);
};

export default Introduction;
