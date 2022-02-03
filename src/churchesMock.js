export const churchesMock = [
	{
		id: '123',
		name: 'Kościół pw. św. Maksymiliana Kolbego na Dąbrowie',
		city: 'Łódź',
		adress: 'Skwer św. Maksymiliana Kolbego 1, 93-279',
		link: 'https://www.google.com/maps/place/Parafia+pw.+%C5%9Bw.+Maksymiliana+Kolbego+na+D%C4%85browie/@51.7331968,19.494628,19.96z/data=!4m5!3m4!1s0x471a35eb422aa0fb:0xec8740dab14944cc!8m2!3d51.73338!4d19.4944379',
		contributor: 'spam@prokopiak.pl',
		website: 'http://archidiecezja.lodz.pl/dabrowa/',
		hours: [
			{
				id: '123',
				interval: '01.01-26.06',
				holySundays: ['7:00', '8:30', '10:00', '11:30', '18:00'],
				weekdays: ['7:00', '18:00'],
			},
			{
				id: '234',
				interval: true,
				holySundays: ['7:00', '10:00'],
				weekdays: ['18:00'],
			},
		],
	},
	{
		id: '234',
		name: 'Bazylika archikatedralna św. Stanisława Kostki',
		city: 'Łódź',
		adress: 'Piotrkowska 265, 90-457 Łódź',
		link: 'https://www.google.com/maps/place/Bazylika+archikatedralna+%C5%9Bw.+Stanis%C5%82awa+Kostki/@51.7578137,19.4657228,14.27z/data=!4m5!3m4!1s0x471a34db426c26b5:0x30b88c0f5d40b830!8m2!3d51.7489985!4d19.4602936',
		contributor: 'spam@prokopiak.pl',
		website: '',
		hours: [
			{
				id: '123',
				interval: '31.01-02.12',
				holySundays: ['7:00', '11:30', '18:00'],
				weekdays: ['7:00', '18:00'],
			},
		],
	},
	{
		id: '235',
		name: 'Sanktuarium Najświętszego Imienia Jezus',
		city: 'Łódź',
		adress: 'Sienkiewicza 60',
		link: 'https://www.google.com/maps/place/Sanktuarium+Naj%C5%9Bwi%C4%99tszego+Imienia+Jezus/@51.7475501,19.4941191,14z/data=!4m9!1m2!2m1!1zamV6dWljaSDFgsOzZMW6!3m5!1s0x471a34d39c453a0f:0xc9e4bdfc8d1683c1!8m2!3d51.7610115!4d19.4638935!15sCg9qZXp1aWNpIMWCw7NkxboiA4gBAVoRIg9qZXp1aWNpIMWCw7NkxbqSAQ9jYXRob2xpY19jaHVyY2iaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUlJhSEo2WTJKQkVBRQ',
		contributor: 'spam@prokopiak.pl',
		website: '',
		hours: [
			{
				id: '123',
				interval: '15.03-06.09',
				holySundays: ['7:00', '8:30', '10:00', '11:30', '18:00'],
				weekdays: ['7:00', '18:00'],
			},
			{
				id: '234',
				interval: true,
				holySundays: ['7:00', '10:00'],
				weekdays: ['18:00'],
			},
		],
	},
];
