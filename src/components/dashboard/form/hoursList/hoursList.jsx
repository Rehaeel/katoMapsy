import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as formActions from '../../../../store/form/actionCreator';
import { selectForm } from '../../../../store/selectors';

import styles from './hoursList.module.css';
import edit from '../../../icons/pen.svg';
import trash from '../../../icons/trash.svg';

import { convertWholeYear } from '../../../helpers/helperFunctions';

const HoursList = () => {
	const dispatch = useDispatch();
	const { currentHoursList, currentChurch } = useSelector(selectForm);

	const [hoursList, setHoursList] = useState(currentChurch.hours);

	useEffect(() => {
		setHoursList(currentHoursList);
	}, [currentHoursList]);

	const printOutHours = (list, name) =>
		[<span className='grayed-out'>{name}</span>, ...list].map((hour, i) => {
			if (i === 0 || i === 1) return <span key={i}>{hour}</span>;
			else return <span key={i}>{`, ${hour}`}</span>;
		});

	const editHoursHandler = (hours) => {
		dispatch(formActions.actionSetRangeIsUpdating());
		dispatch(formActions.actionSetCurrentRange(hours));
	};

	const deleteHoursHandler = (rangeId) =>
		dispatch(formActions.actionDeleteHourInList(rangeId));

	console.log(hoursList);

	return (
		<ul className={styles['hours-list']}>
			{hoursList.map((range) => (
				<li
					key={range.interval.toString()}
					className={styles['hours-range']}>
					<div className={styles['range-container']}>
						<div className={styles.range}>
							{convertWholeYear(range.interval)}
						</div>

						<div>
							<ul className={styles.weekdays}>
								{printOutHours(
									range.weekdays,
									'dni powszednie: '
								)}
							</ul>
							<ul className={styles['holy-sundays']}>
								{printOutHours(
									range.holySundays,
									'niedziele i święta: '
								)}
							</ul>
						</div>
						<div className={styles.modifications}>
							<div
								className={styles['edit-container']}
								onClick={() => editHoursHandler(range)}>
								<img src={edit} alt='edytuj godziny' />
							</div>
							<div
								className={styles['delete-container']}
								onClick={() => deleteHoursHandler(range.id)}>
								<img src={trash} alt='usuń zakres' />
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default HoursList;
