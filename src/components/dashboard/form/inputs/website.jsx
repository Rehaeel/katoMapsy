import Input from '../../../input/input';

export const WebsiteInput = (props) => (
	<Input
		labelText='Strona parafii'
		helperText={
			<span>
				Link do{' '}
				{props.hasProperty('website') ? (
					<a
						href={props.websiteRef.current.value}
						alt='link do strony'
						target='_blank'>
						strony parafii
					</a>
				) : (
					'strony parafii'
				)}
				, najlepiej do zakładki o Mszach Świętych
			</span>
		}
		placeholder='strona parafii'
		thisRef={props.websiteRef}
		shrink={props.websiteShrink}
		setUnShrink={() =>
			props.websiteRef.current.value !== '' ||
			props.setWebsiteShrink(false)
		}
		setShrink={() => props.setWebsiteShrink(true)}
	/>
);
