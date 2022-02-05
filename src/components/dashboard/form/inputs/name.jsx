import Input from '../../../input/input';

export const NameInput = (props) => (
	<Input
		labelText='Nazwa'
		required={true}
		helperText='Pełna nazwa parafii'
		placeholder='nazwa parafii'
		thisRef={props.nameRef}
		shrink={props.nameShrink}
		setUnShrink={() => props.nameRef.current.value !== '' || props.setNameShrink(false)}
		setShrink={() => props.setNameShrink(true)}
		disabled={props.gotLink}
	/>
);
