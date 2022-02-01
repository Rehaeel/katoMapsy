import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import styles from './hoursAdder.module.css';
import { pl as plLang } from 'react-date-range/src/locale/index';
import { selectOptions } from '../../../../constants';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm } from '../../../../store/selectors';
import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '../../../button/button';
import {
	actionAddCurrentHours,
	actionResetCurrentHours,
	actionUpdateHours,
} from '../../../../store/form/actionCreator';
import { v4 as uuid } from 'uuid';
import close from '../../../icons/close.svg';

const HoursAdder = () => {
	const dispatch = useDispatch();
	const { showForm, currentRange, isRangeUpdating, currentHoursList } =
		useSelector(selectForm);

	const [weekValue, setWeekValue] = useState();
	const [sundayValue, setSundayValue] = useState();

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isFullYear, setIsFullYear] = useState(true);

	const initialSelection = [
		{
			startDate: new Date(new Date().getFullYear(), 0, 1),
			endDate: new Date(new Date().getFullYear(), 0, 1),
			key: 'selection',
		},
	];

	const [selection, setSelection] = useState(initialSelection);

	const init = () => {
		setSelection(initialSelection);
		setIsFullYear(true);
		setSundayValue();
		setWeekValue();
		setShowDatePicker(false);
		dispatch(actionResetCurrentHours());
	};

	useEffect(() => {
		if (
			currentRange.holySundays[0] === '' &&
			currentRange.weekdays[0] === ''
		)
			return init();

		setSundayValue(
			currentRange.holySundays.map((hour) => ({
				value: hour,
				label: hour,
			}))
		);
		setWeekValue(
			currentRange.weekdays.map((hour) => ({
				value: hour,
				label: hour,
			}))
		);

		if (currentRange.interval !== true) {
			setIsFullYear(false);
			setShowDatePicker(true);
			const rangeArr = currentRange.interval.split('-');
			const startDate = new Date(
				new Date().getFullYear(),
				rangeArr[0].split('.')[1] - 1,
				rangeArr[0].split('.')[0]
			);
			const endDate = new Date(
				new Date().getFullYear(),
				rangeArr[1].split('.')[1] - 1,
				rangeArr[1].split('.')[0]
			);
			const { key } = initialSelection[0];

			setSelection([{ startDate, endDate, key }]);
		} else {
			setIsFullYear(true);
			setShowDatePicker(false);
		}
	}, [currentRange]);

	const convertIntervalIntoDDMM = (interval) =>
		interval
			.toLocaleDateString()
			.slice(0, -5)
			.split('.')
			.map((num) => num.padStart(2, '0'))
			.join('.');

	const onSubmitHandler = () => {
		const alertStartingMsg = 'Dodaj godziny w polu: ';
		let alertMessage = [];
		if (sundayValue.value === null) alertMessage.push('niedziele i święta');
		if (weekValue.value === null) alertMessage.push('dni powszednie');
		if (alertMessage.length > 0)
			return alert(`${alertStartingMsg}${alertMessage}`);

		const dateRange = {
			id: isRangeUpdating ? currentRange.id : uuid(),
			interval:
				isFullYear ||
				`${convertIntervalIntoDDMM(
					selection[0].startDate
				)}-${convertIntervalIntoDDMM(selection[0].endDate)}`,
			holySundays: sundayValue.map((el) => el.value),
			weekdays: weekValue.map((el) => el.value),
		};
		console.log(dateRange);

		if (isRangeUpdating) dispatch(actionUpdateHours(dateRange));
		else if (!isRangeUpdating) dispatch(actionAddCurrentHours(dateRange));

		init();
	};

	return (
		<div className={styles['date-container']}>
			<div
				className={styles['date-adder']}
				style={{ marginTop: showForm ? '0' : '-100%' }}>
				<div className={styles.header}>
					<img
						src={close}
						alt='wyjdź z edycji godzin'
						onClick={() => init()}
					/>
					<h2>Dodaj godziny</h2>
					<Button onClick={onSubmitHandler}>
						{isRangeUpdating
							? 'aktualizuj godziny'
							: 'dodaj godziny'}
					</Button>
				</div>

				<div className={styles['week-days']}>
					<h3>dni powszednie</h3>
					<Select
						options={selectOptions}
						isMulti={true}
						value={weekValue}
						onChange={setWeekValue}
					/>
				</div>
				<div className={styles['holy-sunday']}>
					<h3>niedziele i święta</h3>
					<Select
						options={selectOptions}
						isMulti={true}
						value={sundayValue}
						onChange={setSundayValue}
					/>
				</div>

				<div className={styles.checkbox}>
					<div className={styles.selection}>
						{!isFullYear && (
							<p>
								{selection[0].startDate
									.toLocaleDateString()
									.slice(0, -5)}
								{` - `}
								{selection[0].endDate
									.toLocaleDateString()
									.slice(0, -5)}
							</p>
						)}
					</div>
					<FormControlLabel
						control={
							<Checkbox
								checked={isFullYear}
								onChange={(e) => {
									setShowDatePicker(!e.target.checked);
									setIsFullYear(e.target.checked);
								}}
								sx={{
									color: '#59981a',
									'&.Mui-checked': {
										color: '#59981a',
									},
								}}
							/>
						}
						label='cały rok'
					/>

					{showDatePicker && (
						<div>
							<DateRange
								editableDateInputs={true}
								moveRangeOnFirstSelection={false}
								onChange={(item) =>
									setSelection([item.selection])
								}
								ranges={selection}
								rangeColors={['#59981a']}
								locale={plLang}
								showMonthAndYearPickers={true}
								maxDate={
									new Date(new Date().getFullYear(), 11, 31)
								}
								minDate={
									new Date(new Date().getFullYear(), 0, 1)
								}
								scroll={{ enable: true }}
								dateDisplayFormat='dd MMM'
								startDatePlaceholder='Od'
								endDatePlaceholder='Do'
							/>
							<Button
								onClick={() => {
									setShowDatePicker(false);
								}}>
								dodaj zakres
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HoursAdder;
