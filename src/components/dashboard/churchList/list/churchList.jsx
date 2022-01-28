import styles from './churchList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectChurch, selectCurrentChurch } from '../../../../store/selectors';

import Button from '../../../button/button';
import { getMapCoords } from '../../../helpers/helperFunctions';
import ChurchCard from '../card/churchCard';
import { actionSetChurch } from '../../../../store/currentChurch/actionCreator';

const ChurchList = ({ setMapZoomLevel, setMarkerPos }) => {
	const dispatch = useDispatch();
	const churches = useSelector(selectChurch);

	const onCardClick = (id) => {
		const currentChurch = churches.find((el) => el.id === id);
		setMapZoomLevel(16);
		setMarkerPos(getMapCoords(currentChurch.link));
		dispatch(actionSetChurch(currentChurch));
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
						/>
					);
				})}
			</ul>
			<Button>Dodaj</Button>
		</section>
	);
};

export default ChurchList;
