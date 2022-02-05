const NameAndAdress = (props) => (
	<div className={props.styles['adress-and-name']}>
		<p>{props.church.name},</p>
		<p>
			ul. {props.church.adress}, {props.church.city}
		</p>
	</div>
);

export default NameAndAdress;
