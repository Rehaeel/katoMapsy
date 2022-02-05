import styles from './button.module.css';

const Button = (props) => (
	<button className={styles.button} type={props.type} onClick={props.onClick}>
		{props.children}
	</button>
);

export default Button;
