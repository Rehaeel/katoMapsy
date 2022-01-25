const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
const mapsy = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

/////////// USER
app.post('/user', (req, res) => {
	const { userName, password, name } = req.headers;

	mapsy.query(
		`INSERT INTO users (userName, password, name) VALUES ('${userName}', '${password}', '${name}');`,
		(err, result) => {
			if (err) console.error(err);

			res.send(result);
		}
	);
});

app.get('/user', (req, res) => {
	const { username, password } = req.headers;

	mapsy.query(
		`SELECT userName, name FROM users WHERE userName='${username}' AND password='${password}'`,
		(err, result) => {
			if (err) console.error(err);

			res.send(result);
		}
	);
});

/////////// MAPS

app.get('/church/all', (_, res) => {
	mapsy.query(`SELECT * FROM churches`, (err, result) => {
		if (err) console.error(err);

		res.send(result);
	});
});

app.get('/church/:id', (req, res) => {
	const churchId = req.params.id;

	mapsy.query(
		`SELECT * FROM churches WHERE id='${churchId}'`,
		(err, result) => {
			if (err) console.error(err);

			res.send(result);
		}
	);
});

app.listen(process.env.PORT, () => {
	console.log(`Server running on port: ${process.env.PORT}`);
});
