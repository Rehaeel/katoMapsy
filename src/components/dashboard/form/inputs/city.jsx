import Input from '../../../input/input';
import styles from './adressAndCity.module.css';
import pen from '../../../icons/pen.svg';
import ok from '../../../icons/check.svg';

export const CityInput = (props) => (
	<div className={styles.city}>
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
			disabled={props.cityDisabled}
		/>
		<img
			style={{ paddingLeft: 10 }}
			src={props.cityDisabled ? pen : ok}
			alt={props.cityDisabled ? 'edytuj adress' : 'zaakceptuj adress'}
			onClick={() => props.setCityDisabled(!props.cityDisabled)}
		/>
	</div>
);
