import { useRef } from 'react';
import Input from '../../input/input';

const ChurchForm = (props) => {
	const nameRef = useRef();
	const townRef = useRef();
	const adressRef = useRef();
	const homepageRef = useRef();

	return (
		<>
			<h1>Formularz</h1>
			<form>
				<Input
					labelText='Nazwa'
					required={true}
					helperText='Pełna nazwa parafii'
					placeholder='nazwa parafii'
					thisRef={nameRef}
				/>
				<Input
					labelText='Miasto'
					required={true}
					placeholder='miasto'
					helperText='miasto, nie diecezja'
					thisRef={townRef}
				/>
				<Input
					labelText='Adress'
					required={true}
					helperText='Pełen adress wraz numerem lokalu'
					placeholder='adress'
					thisRef={adressRef}
				/>
				<Input
					labelText='Strona parafii'
					helperText='Link do strony parafii, najlepiej do zakładki o Mszach Świętych'
					placeholder='strona parafii'
					thisRef={homepageRef}
				/>
			</form>
		</>
	);
};

export default ChurchForm;
