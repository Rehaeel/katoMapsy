import Input from '../../../input/input';

export const AdreesInput = (props) => (
	<Input
		labelText='Adress'
		required={true}
		helperText='Pełen adress wraz numerem lokalu'
		placeholder='adress'
		thisRef={props.adressRef}
		shrink={props.adressShrink}
		setUnShrink={() =>
			props.adressRef.current.value !== '' || props.setAdressShrink(false)
		}
		setShrink={() => props.setAdressShrink(true)}
		disabled={props.gotLink}
	/>
);
