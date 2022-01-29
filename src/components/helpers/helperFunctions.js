export const getMapCoords = (link) => {
	let [lat, long] = link.slice(link.indexOf('!3d') + 3).split('!4d');
	long = long.slice(0, long.indexOf('!'));
	return [lat, long];
};
