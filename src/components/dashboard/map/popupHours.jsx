const PopupHours = (props) => {
	const sortedList = props.hours.sort((a, b) => {
		if (a.interval === true) return 1;
		const startRangeA = a.interval.split('-')[0];
		const [startRangeDayA, startRangeMonthA] = startRangeA.split('.');

		const startRangeB = b.interval.split('-')[0];
		const [startRangeDayB, startRangeMonthB] = startRangeB.split('.');

		if (startRangeMonthA > startRangeMonthB) return 1;
		if (startRangeMonthA < startRangeMonthB) return -1;

		if (startRangeMonthA === startRangeMonthB) {
			if (startRangeDayA > startRangeDayB) return 1;
			if (startRangeDayA < startRangeDayB) return -1;
		}
	});

	const hoursReducer = (hoursList) =>
		hoursList.reduce((acc, curr, i) => {
			if (i === 0) return acc + curr;
			else return `${acc}, ${curr}`;
		}, '');

	return sortedList.map((range) => {
		if (range.interval === true) {
			return (
				<div key={range.interval} className={props.styles.hours}>
					<p>
						przedział czasowy: <b>cały rok</b>
					</p>
					<p>
						<b>w tygodniu</b>: {hoursReducer(range.weekdays)}
					</p>
					<p>
						<b>w niedziele i święta</b>:{' '}
						{hoursReducer(range.holySundays)}
					</p>
				</div>
			);
		} else {
			return (
				<div key={range.interval} className={props.styles.hours}>
					<p>
						przedział czasowy: <b>{range.interval}</b>
					</p>
					<p>
						<b>w tygodniu</b>: {hoursReducer(range.weekdays)}
					</p>
					<p>
						<b>w niedziele i święta</b>:{' '}
						{hoursReducer(range.holySundays)}
					</p>
				</div>
			);
		}
	});
};

export default PopupHours;
