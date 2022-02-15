import Input from '../../../input/input';
import styles from './adressAndCity.module.css';
import pen from '../../../icons/pen.svg';
import ok from '../../../icons/check.svg';

export const AdreesInput = (props) => (
	<div className={styles.adress}>
		<Input
			labelText='Adress'
			required={true}
			helperText='Pełen adress wraz numerem lokalu'
			placeholder='adress'
			thisRef={props.adressRef}
			shrink={props.adressShrink}
			setUnShrink={() =>
				props.adressRef.current.value !== '' ||
				props.setAdressShrink(false)
			}
			setShrink={() => props.setAdressShrink(true)}
			disabled={props.adressDisabled}
		/>
		<img
			style={{ paddingLeft: 10 }}
			src={props.adressDisabled ? pen : ok}
			alt={props.adressDisabled ? 'edytuj adress' : 'zaakceptuj adress'}
			onClick={() => props.setAdressDisabled(!props.adressDisabled)}
		/>
	</div>
);
