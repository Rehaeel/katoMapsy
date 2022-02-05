import styles from './churchCard.module.css';

const ChurchCard = (props) => (
	<li className={styles.card} onClick={props.onClick}>
		{props.name}
	</li>
);

export default ChurchCard;
