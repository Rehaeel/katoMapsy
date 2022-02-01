import styles from './churchList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectChurch, selectForm } from '../../../../store/selectors';

import Button from '../../../button/button';
import ChurchCard from '../card/churchCard';
import * as formActions from '../../../../store/form/actionCreator';

const ChurchList = () => {
	const dispatch = useDispatch();
	const churches = useSelector(selectChurch);
	const { showForm, currentHoursList } = useSelector(selectForm);

	const onCardClick = (id) => {
		const currentChurch = churches.find((el) => el.id === id);

		dispatch(formActions.actionSetCurrChurch(currentChurch));
		dispatch(formActions.actionSetCurrentHoursList(currentChurch.hours));

		dispatch(formActions.actionShowUpdateForm());
		dispatch(formActions.actionShowForm());
		dispatch(formActions.actionSetRangeIsNotUpdating());
		dispatch(formActions.actionResetCurrentHours());

		dispatch(formActions.actionSetZoom(16));
	};
	return (
		<section
			className={`${styles['church-list']} ${
				showForm ? styles['hide-list'] : ''
			}`}>
			<h2>
				Kościoły dodane przez Ciebie
				{churches.length > 0 && <span>: {churches.length}</span>}
			</h2>
			<ul className={styles.list}>
				{churches.map((church) => {
					return (
						<ChurchCard
							key={church.id}
							name={church.name}
							onClick={() => onCardClick(church.id)}
						/>
					);
				})}
			</ul>
			<Button
				onClick={() => {
					dispatch(formActions.actionResetChurch());
					dispatch(formActions.actionShowForm());
					dispatch(formActions.actionShowCreateForm());
					dispatch(formActions.actionSetRangeIsNotUpdating());
					dispatch(formActions.actionResetCurrentHours());
				}}>
				Dodaj
			</Button>
		</section>
	);
};

export default ChurchList;
