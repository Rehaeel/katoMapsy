import styles from './churchCard.module.css';

const ChurchCard = (props) => {
	return (
		<li className={styles.card} onClick={props.onClick}>
			{props.name}
		</li>
	);
};

export default ChurchCard;
