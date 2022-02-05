import Input from '../../../input/input';

export const GooglePin = (props) => (
	<Input
		labelText='Pinezka'
		required={true}
		helperText={
			<span>
				Link do pinezki map{' '}
				{props.hasProperty('link') ? (
					<a
						href={
							props.googleRef !== undefined &&
							props.googleRef.current.value
						}
						alt='mapy google'
						target='_blank'>
						Google
					</a>
				) : (
					'Google'
				)}
			</span>
		}
		placeholder='Google Maps'
		thisRef={props.googleRef}
		shrink={props.googleShrink}
		setUnShrink={() =>
			props.googleRef.current.value !== '' || props.setGoogleShrink(false)
		}
		setShrink={() => props.setGoogleShrink(true)}
		onChange={props.onLinkChangeHandler}
	/>
);
