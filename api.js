const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.DB_PORT;

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
	const { userName, password, name } = req.body;

	mapsy.query(
		`INSERT INTO users (userName, password, name) VALUES ('${userName}', '${password}', '${name}');`,
		(err, result) => {
			if (err) throw err;

			res.send(result);
		}
	);
});

app.get('/user', (req, res) => {
	const { userName, password } = req.body;

	mapsy.query(
		`SELECT * FROM users WHERE userName='${userName}' AND password='${password}'`,
		(err, result) => {
			if (err) throw err;

			res.send(result);
		}
	);
});

/////////// MAPS

app.get('/church/all', (_, res) => {
	mapsy.query(`SELECT * FROM churches`, (err, result) => {
		if (err) throw err;

		res.send(result);
	});
});

app.get('/church/:id', (req, res) => {
	const churchId = req.params.id;

	mapsy.query(
		`SELECT * FROM churches WHERE id='${churchId}'`,
		(err, result) => {
			if (err) throw err;

			res.send(result);
		}
	);
});

app.listen(process.env.PORT || PORT);
