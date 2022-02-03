export const getMapCoords = (link) => {
	if (!link.includes('!3d')) return 'ERROR';
	let [lat, long] = link.slice(link.indexOf('!3d') + 3).split('!4d');
	long = long.slice(0, long.indexOf('!'));
	return [lat, long];
};

export const getPlaceName = (link) => {
	const part1 = link.slice(link.indexOf('place/') + 6);
	const placeName = part1.slice(0, part1.indexOf('/'));
	const result = decodeURI(placeName).replaceAll('+', ' ');
	return result;
};

export const sortHours = (list) =>
	list.sort((a, b) => {
		const [hour1, minute1] = a.split(':');
		const [hour2, minute2] = b.split(':');

		if (+hour1 > +hour2) return 1;
		if (+hour1 < +hour2) return -1;
		if (+hour1 === +hour2) {
			if (+minute1 > +minute2) return 1;
			if (+minute1 < +minute2) return -1;
		}
	});

export const customSelectTheme = (theme) => ({
	...theme,
	colors: {
		...theme.colors,
		primary25: 'rgba(89, 152, 26, 0.3)',
		primary: 'var(--cl-main)',
		primary50: 'var(--cl-light)',
		neutral10: 'rgba(89, 152, 26, 0.2)',
	},
});

export const churchFormAlertMessage = (church) => {
	let alertMessage = [];

	if (church.hours[0].id === '') alertMessage.push('godziny');
	if (church.link === '') alertMessage.push('pinezka');
	if (church.name === '') alertMessage.push('nazwa');
	if (church.adress === '') alertMessage.push('adres');
	if (church.city === '') alertMessage.push('miasto');

	const message = alertMessage.reduce((acc, msg, i) => {
		if (i === 0) return acc + msg;
		else return `${acc}, ${msg}`;
	}, 'Dodaj dane kościoła: ');

	if (alertMessage.length > 0) return message;
};

export const rangeAdderAlertMessage = (sundayValue, weekValue) => {
	let alertMessage = [];
	if (sundayValue === null) alertMessage.push('niedziele i święta');
	else if (
		sundayValue[0].value === undefined ||
		sundayValue[0].value === null
	)
		alertMessage.push('niedziele i święta');
	if (weekValue === null) alertMessage.push('dni powszednie');
	else if (weekValue[0].value === undefined || weekValue[0].value === null)
		alertMessage.push('dni powszednie');

	const message = alertMessage.reduce((acc, msg, i) => {
		if (i === 0) return acc + msg;
		else return `${acc}, ${msg}`;
	}, 'Dodaj godziny w polu: ');
	if (alertMessage.length > 0) return message;
};
