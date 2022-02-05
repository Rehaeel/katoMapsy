import Input from '../../../input/input';

export const CityInput = (props) => (
	<Input
		labelText='Miasto'
		required={true}
		placeholder='miasto'
		helperText='miasto, nie diecezja'
		thisRef={props.cityRef}
		shrink={props.cityShrink}
		setUnShrink={() =>
			props.cityRef.current.value !== '' || props.setCityShrink(false)
		}
		setShrink={() => props.setCityShrink(true)}
		disabled={props.gotLink}
	/>
);
