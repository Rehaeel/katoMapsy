import styles from './churchList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectChurch } from '../../../../store/selectors';

import Button from '../../../button/button';
import ChurchCard from '../card/churchCard';
import * as formActions from '../../../../store/form/actionCreator';

const ChurchList = () => {
	const dispatch = useDispatch();
	const churches = useSelector(selectChurch);

	const onCardClick = (id) => {
		dispatch(
			formActions.actionSetCurrChurch(churches.find((el) => el.id === id))
		);
		dispatch(formActions.actionIsUpdating());
		dispatch(formActions.actionShowForm());

		dispatch(formActions.actionSetZoom(16));
	};
	return (
		<section className={styles['church-list']}>
			<h1>
				Kościoły dodane przez Ciebie
				{churches.length > 0 && <span>: {churches.length}</span>}
			</h1>
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
					dispatch(formActions.actionIsCreating());
				}}>
				Dodaj
			</Button>
		</section>
	);
};

export default ChurchList;
