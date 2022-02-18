import { useState, useEffect } from 'react';

import Input from '../../../input/input';
import styles from './styles.module.css';
import pen from '../../../icons/pen.svg';
import ok from '../../../icons/check.svg';

export const CityInput = (props) => {
	const [renderProps, setRenderProps] = useState(false);

	useEffect(() => {
		if ('value' in props.cityRef.current)
			if (props.cityRef.current.value !== '') setRenderProps(true);
			else setRenderProps(false);

		return () => setRenderProps(false);
	}, [props.cityRef, props.cityDisabled]);

	return (
		<div className={styles.city}>
			<Input
				labelText='Miasto'
				required={true}
				placeholder='miasto'
				helperText='miasto, nie diecezja'
				thisRef={props.cityRef}
				shrink={props.cityShrink}
				setUnShrink={() =>
					props.cityRef.current.value !== '' ||
					props.setCityShrink(false)
				}
				setShrink={() => props.setCityShrink(true)}
				disabled={props.cityDisabled}
			/>
			{renderProps && (
				<img
					src={props.cityDisabled ? pen : ok}
					title={
						props.cityDisabled
							? 'edytuj adress'
							: 'zaakceptuj adress'
					}
					alt={
						props.cityDisabled
							? 'edytuj adress'
							: 'zaakceptuj adress'
					}
					onClick={() => props.setCityDisabled(!props.cityDisabled)}
				/>
			)}
		</div>
	);
};
