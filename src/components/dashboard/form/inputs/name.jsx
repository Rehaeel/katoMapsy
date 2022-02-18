import { useState, useEffect } from 'react';

import Input from '../../../input/input';
import styles from './styles.module.css';

import edit from '../../../icons/pen.svg';
import ok from '../../../icons/check.svg';

export const NameInput = (props) => {
	const [renderProps, setRenderProps] = useState(false);

	useEffect(() => {
		if ('value' in props.nameRef.current)
			if (props.nameRef.current.value !== '') setRenderProps(true);
			else setRenderProps(false);

		return () => setRenderProps(false);
	}, [props.nameRef, props.nameDisabled]);

	return (
		<div className={styles.name}>
			<Input
				labelText='Nazwa'
				required={true}
				helperText='Pełna nazwa parafii'
				placeholder='nazwa parafii'
				thisRef={props.nameRef}
				shrink={props.nameShrink}
				setUnShrink={() =>
					props.nameRef.current.value !== '' ||
					props.setNameShrink(false)
				}
				setShrink={() => props.setNameShrink(true)}
				disabled={props.nameDisabled}
			/>
			{renderProps && (
				<img
					src={props.nameDisabled ? edit : ok}
					title={
						props.nameDisabled
							? 'edytuj nazwę'
							: 'zaakceptuj zmiany'
					}
					alt={
						props.nameDisabled
							? 'edytuj nazwę'
							: 'zaakceptuj zmiany'
					}
					onClick={() => props.setNameDisabled(!props.nameDisabled)}
				/>
			)}
		</div>
	);
};
