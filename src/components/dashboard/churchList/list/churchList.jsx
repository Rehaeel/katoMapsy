import styles from './churchList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectChurch } from '../../../../store/selectors';

import Button from '../../../button/button';
import { getMapCoords } from '../../../helpers/helperFunctions';
import ChurchCard from '../card/churchCard';
import * as formActions from '../../../../store/form/actionCreator';
import { useState } from 'react';

const ChurchList = ({ setMapZoomLevel, setMarkerPos }) => {
	const dispatch = useDispatch();
	const churches = useSelector(selectChurch);
	const [currentChurch, setCurrentChurch] = useState(churches[0]);

	const onCardClick = (id) => {
		setCurrentChurch(churches.find((el) => el.id === id));

		dispatch(formActions.actionSetChurch(currentChurch));
		dispatch(formActions.actionIsUpdating());
		dispatch(formActions.actionShowForm());

		if (!currentChurch.link) return;
		setMapZoomLevel(16);
		setMarkerPos(getMapCoords(currentChurch.link));
	};
	return (
		<section className={styles['church-list']}>
			<h1>
				Lista dodanych kościołów
				{churches.length > 0 && <span>: {churches.length}</span>}
			</h1>
			<ul className={styles.list}>
				{churches.map((church) => {
					return (
						<ChurchCard
							key={church.id}
							name={church.name}
							onClick={() => onCardClick(church.id)}
							activeCard={currentChurch.id === church.id}
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
