import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './input.module.css';

const StyledInput = styled(TextField)({
	'& .Mui-disabled': {
		color: 'var(--cl-grayed) !important',
		WebkitTextFillColor:
			'rgba(var(--cl-grayed-r), var(--cl-grayed-g), var(--cl-grayed-b), 0.5) !important',
	},
});

const Input = (props) => {
	return (
		<StyledInput
			className={styles.input}
			label={props.labelText}
			required={props.required}
			type={props.type}
			helperText={props.helperText}
			placeholder={props.placeholder}
			autoFocus={props.autoFocus ?? false}
			fullWidth={false}
			inputRef={props.thisRef}
			variant='outlined'
			error={props.error}
			color={props.error ? 'error' : 'success'}
			InputLabelProps={{ shrink: props.shrink ?? false }}
			onFocus={props.setShrink}
			onBlur={props.setUnShrink}
			disabled={props.disabled}
			onChange={props.onChange}
		/>
	);
};

export default Input;
