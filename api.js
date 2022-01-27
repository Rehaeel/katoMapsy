const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const randToken = require('rand-token');

app.use(cors());
app.use(express.json());
const mapsy = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

/////////// USER
//register
app.post('/user', async (req, res, next) => {
	const { email, password, name } = req.headers;
	const token = randToken.generate(256);

	let shouldContinue = true;

	new Promise((success, error) => {
		mapsy.query(
			`SELECT token FROM users WHERE email='${email}'`,
			(_, response) => {
				if (response.length === 0) return success();

				shouldContinue = false;
				res.status(400).json('email jest już zajęty');
				next();
				return success('email jest juz zajety');
			}
		);
	}).then((isTaken) => {
		if (isTaken) return;
		mapsy.query(
			`INSERT INTO users (email, password, name, token) VALUES ('${email}', '${password}', '${name}', '${token}')`,
			(_, result) => {
				if (shouldContinue) res.send(token);
			}
		);
	});
});

// login
app.get('/user', (req, res, next) => {
	const { email, password } = req.headers;
	const token = randToken.generate(256);

	mapsy.query(
		`UPDATE users SET token='${token}' WHERE email='${email}' AND password='${password}'`,
		(err, result) => {
			if (err) {
				res.status(400).json(err);
				return next();
			}

			const rowsMatched = result.message.slice(15, 17);

			if (rowsMatched == 0) {
				res.status(400).json('zły email lub hasło');
				return next();
			}

			res.send(token);
		}
	);
});

// fetch user
app.get('/user/:token', (req, res, next) => {
	const { token } = req.params;

	mapsy.query(
		`SELECT name FROM users WHERE token='${token}'`,
		(_, result) => {
			if (result.length === 0) {
				res.status(404).json('nie ma takiego użytkownika');
				return next();
			}

			res.send(result[0].name);
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
