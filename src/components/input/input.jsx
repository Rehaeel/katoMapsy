import styles from './input.module.css';

const Input = (props) => {
	return (
		<label className={styles['input-label']}>
			{props.labelText}
			<input
				type={props.type ?? 'text'}
				placeholder={props.placeholder}
				className={props.wrongInput ? 'bad-input' : ''}
				ref={props.thisRef}
			/>
		</label>
	);
};

export default Input;
