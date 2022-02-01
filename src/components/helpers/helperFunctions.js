export const getMapCoords = (link) => {
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
