import styles from './searchBar.module.css';

const SearchBar = (props) => {
	const submitHandler = (e) => {
		e.preventDefault();
		const listRef = [...props.listRef.children].find(
			(el) => el.children.length > 1
		);
		const elRef = [...listRef.children];

		elRef[1].click();
		props.setSearchValue('');
	};
	
	return (
		<div className={styles['seach-bar-container']}>
			<form className={styles['search-bar']} onSubmit={submitHandler}>
				<input
					type='text'
					value={props.searchValue}
					onChange={(e) => props.setSearchValue(e.target.value)}
					placeholder='wyszukaj kościół'
					ref={props.searchRef}
				/>
				<p>/</p>
			</form>
			<div className={styles.separator}></div>
		</div>
	);
};

export default SearchBar;
