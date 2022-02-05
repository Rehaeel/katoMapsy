const NameAndAdress = (props) => {
	return (
		<div className={props.styles['adress-and-name']}>
			<p>{props.church.name},</p>
			<p>ul. {props.church.adress}</p>
		</div>
	);
};

export default NameAndAdress;
