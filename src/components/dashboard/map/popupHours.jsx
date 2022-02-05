import { useEffect, useState } from 'react';

const PopupHours = (props) => {
	// let currentRange;

	// const intervalsArr = props.hours.map((range) => range.interval);

	// let thisDay = new Date().getDate().toString().padStart(2, '0');
	// let thisMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');

	// const wholeYear = intervalsArr.find((int) => int.toString() === 'true');

	// if (wholeYear)
	// 	currentRange = props.hours.find((range) => range.interval === true);
	// else {
	// 	currentRange = props.hours.find((hours) => {
	// 		const [intStart, intEnd] = hours.interval.split('-');
	// 		const [intStartD, intStartM] = intStart.split('.');
	// 		const [intEndD, intEndM] = intEnd.split('.');

	// 		if (thisMonth >= intStartM && thisMonth <= intEndM)
	// 			if (thisDay >= intStartD && thisDay <= intEndD) return true;
	// 	});
	// }

	// let weekdaysHours, holySundaysHours;

	// if (currentRange !== undefined) {
	// 	weekdaysHours = currentRange.weekdays.reduce((acc, curr, i) => {
	// 		if (i === 0) return acc + curr;
	// 		else return `${acc}, ${curr}`;
	// 	}, '');

	// 	holySundaysHours = currentRange.holySundays.reduce((acc, curr, i) => {
	// 		if (i === 0) return acc + curr;
	// 		else return `${acc}, ${curr}`;
	// 	}, '');
	// }

	const hoursReducer = (hoursList) =>
		hoursList.reduce((acc, curr, i) => {
			if (i === 0) return acc + curr;
			else return `${acc}, ${curr}`;
		}, '');

	return props.hours.map((range) => {
		if (range.interval === true) {
			return (
				<div key={range.interval} className={props.styles.hours}>
					<p>interwał: cały rok</p>
					<p>w tygodniu: {hoursReducer(range.weekdays)}</p>
					<p>
						w niedziele i święta: {hoursReducer(range.holySundays)}
					</p>
				</div>
			);
		} else {
			return (
				<div key={range.interval} className={props.styles.hours}>
					<p>interwał: {range.interval}</p>
					<p>w tygodniu: {hoursReducer(range.weekdays)}</p>
					<p>
						w niedziele i święta: {hoursReducer(range.holySundays)}
					</p>
				</div>
			);
		}
	});
};

export default PopupHours;
