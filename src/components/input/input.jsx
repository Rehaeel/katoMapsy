import { TextField } from '@mui/material';

const Input = (props) => {
	return (
		<TextField
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
