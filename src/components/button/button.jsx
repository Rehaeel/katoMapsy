import styles from './button.module.css';

const Button = (props) => (
	<button
		className={styles.button}
		type={props.type}
		onClick={props.onClick}
		ref={props.btnRef}>
		{props.children}
	</button>
);

export default Button;
