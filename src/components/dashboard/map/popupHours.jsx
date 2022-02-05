import { useEffect, useState } from 'react';

const PopupHours = (props) => {
	const [currentHours, setCurrentHours] = useState(props.hours[0].interval);

	const intervalsArr = props.hours.map((range) => range.interval);

	useEffect(() => {
		let thisDay = new Date().getDate().toString().padStart(2, '0');
		let thisMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');

		const wholeYear = Boolean(intervalsArr.find((int) => int === true));
		if (wholeYear) {
			setCurrentHours('01.01-31.12');
		} else {
			setCurrentHours(
				props.hours.find((hours) => {
					const [intStart, intEnd] = hours.interval.split('-');
					const [intStartD, intStartM] = intStart.split('.');
					const [intEndD, intEndM] = intEnd.split('.');

					if (thisMonth >= intStartM && thisMonth <= intEndM)
						if (thisDay >= intStartD && thisDay <= intEndD)
							return true;
				})
			);
		}
	}, []);

	const [weekdaysHours, setWeekdaysHours] = useState();
	const [holySundaysHours, setHolySundayHours] = useState();

	useEffect(() => {
		if (currentHours.weekdays !== undefined) {
			setWeekdaysHours(
				currentHours.weekdays.reduce((acc, curr, i) => {
					if (i === 0) return acc + curr;
					else return `${acc}, ${curr}`;
				}, '')
			);
			setHolySundayHours(
				currentHours.holySundays.reduce((acc, curr, i) => {
					if (i === 0) return acc + curr;
					else return `${acc}, ${curr}`;
				}, '')
			);
		}
	}, [currentHours]);

	return (
		<div className={props.styles.hours}>
			<i>teraz: </i>
			<p>w tygodniu: {weekdaysHours}</p>
			<p>w niedziele i święta: {holySundaysHours}</p>
		</div>
	);
};

export default PopupHours;
