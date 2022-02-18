import { useState, useEffect } from 'react';

import Input from '../../../input/input';
import styles from './styles.module.css';
import pen from '../../../icons/pen.svg';
import ok from '../../../icons/check.svg';

export const AdreesInput = (props) => {
	const [renderProps, setRenderProps] = useState(false);

	useEffect(() => {
		if ('value' in props.adressRef.current)
			if (props.adressRef.current.value !== '') setRenderProps(true);
			else setRenderProps(false);

		return () => setRenderProps(false);
	}, [props.adressRef, props.adressDisabled]);

	return (
		<div className={styles.adress}>
			<Input
				labelText='Adress'
				required={true}
				placeholder='adress'
				helperText='Pełen adress wraz numerem lokalu'
				thisRef={props.adressRef}
				shrink={props.adressShrink}
				setUnShrink={() =>
					props.adressRef.current.value !== '' ||
					props.setAdressShrink(false)
				}
				setShrink={() => props.setAdressShrink(true)}
				disabled={props.adressDisabled}
			/>
			{renderProps && (
				<img
					src={props.adressDisabled ? pen : ok}
					title={
						props.adressDisabled
							? 'edytuj adress'
							: 'zaakceptuj adress'
					}
					alt={
						props.adressDisabled
							? 'edytuj adress'
							: 'zaakceptuj adress'
					}
					onClick={() =>
						props.setAdressDisabled(!props.adressDisabled)
					}
				/>
			)}
		</div>
	);
};
