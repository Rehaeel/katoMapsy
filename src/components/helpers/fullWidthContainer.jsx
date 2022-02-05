import styles from './fullWidthContainer.module.css';

const FullWidthContainer = (props) => (
	<section
		className={styles.container}
		style={{
			height: props.isFullHeight
				? 'calc(100vh - var(--nav-height))'
				: props.height,
		}}>
		{props.children}
	</section>
);

export default FullWidthContainer;
