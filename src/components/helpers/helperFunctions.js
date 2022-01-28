export const getMapCoords = (link) =>
	link.slice(link.indexOf('!3d') + 3).split('!4d');
