import { useEffect, useRef, useState } from 'react';
import styles from './churchList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectChurch, selectForm } from '../../../../store/selectors';
import * as formActions from '../../../../store/form/actionCreator';

import Button from '../../../button/button';
import ChurchCard from '../card/churchCard';
import SearchBar from './searchBar/searchBar';
import { motion, AnimatePresence } from 'framer-motion';
import enter from '../../../icons/enter.svg';

const ChurchList = (props) => {
	const dispatch = useDispatch();
	const { list: churches } = useSelector(selectChurch);
	const { showForm } = useSelector(selectForm);

	const [searchValue, setSearchValue] = useState('');
	const churchListRef = useRef();

	const [citiesList, setCitiesList] = useState([]);
	useEffect(() => {
		const list = new Set();
		churches.forEach((church) => list.add(church.city));
		setCitiesList([...list]);
	}, [churches]);

	const onCardClick = (id) => {
		const currentChurch = churches.find((el) => el.id === id);

		dispatch(formActions.actionSetCurrChurch(currentChurch));
		dispatch(formActions.actionSetCurrentHoursList(currentChurch.hours));

		dispatch(formActions.actionShowUpdateForm());
		dispatch(formActions.actionShowForm());
		dispatch(formActions.actionSetRangeIsNotUpdating());
		dispatch(formActions.actionResetCurrentRange());

		dispatch(formActions.actionSetZoom(16));
	};

	const filterBy = (church) =>
		church.name.toLowerCase().includes(searchValue.toLowerCase()) ||
		church.city.toLowerCase().includes(searchValue.toLowerCase());

	return (
		!showForm && (
			<section
				className={styles['church-list']}
				ref={props.chruchlistRef}>
				<SearchBar
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					searchRef={props.searchRef}
					listRef={churchListRef.current}
				/>
				<motion.div layout className={styles.list} ref={churchListRef}>
					{churches.length === 0 ? (
						<h4>brak dodanych kościołów</h4>
					) : (
						citiesList.map((city) => (
							<AnimatePresence>
								<motion.ul
									layout
									animate={{ opacity: 1, scale: 1 }}
									initial={{ opacity: 0, scale: 0 }}
									exit={{ opacity: 0, scale: 0 }}
									key={city}
									style={{
										display: `${
											churches
												.filter((church) => {
													if (searchValue === '')
														return true;

													return filterBy(church);
												})
												.filter(
													(church) =>
														church.city === city
												).length > 0
												? ''
												: 'none'
										}`,
									}}>
									<h3>{city}</h3>
									{churches
										.filter((church) => {
											if (searchValue === '') return true;

											return filterBy(church);
										})
										.filter(
											(church) => church.city === city
										)
										.map((church) => {
											return (
												<ChurchCard
													key={church.id}
													name={church.name}
													onClick={() =>
														onCardClick(church.id)
													}
												/>
											);
										})}
								</motion.ul>
							</AnimatePresence>
						))
					)}
				</motion.div>
				<Button
					onClick={() => {
						dispatch(formActions.actionResetChurch());
						dispatch(formActions.actionShowForm());
						dispatch(formActions.actionShowCreateForm());
						dispatch(formActions.actionSetRangeIsNotUpdating());
						dispatch(formActions.actionResetCurrentRange());
					}}>
					Dodaj&nbsp;&nbsp; [
					<img
						src={enter}
						alt='enter fires add button'
						className={styles.enter}
					/>
					]
				</Button>
			</section>
		)
	);
};

export default ChurchList;
