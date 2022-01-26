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
app.post('/user', (req, res) => {
	const { username, password, name } = req.headers;
	const token = randToken.generate(256);

	mapsy.query(
		`INSERT INTO users (userName, password, name, token) VALUES ('${username}', '${password}', '${name}', ${token});`,
		(err, result) => {
			if (err) console.error(err);

			res.send(result);
		}
	);
});

// login
app.get('/user', (req, res) => {
	const { email, password } = req.headers;
	const token = randToken.generate(256);

	mapsy.query(
		`UPDATE users SET token='${token}' WHERE email='${email}' AND password='${password}'`,
		(err, result) => {
			if (err) return res.send(err);
			const rowsMatched = result.message.slice(15, 17);

			if (rowsMatched == 0) return res.send('zły email lub hasło');
			
			res.send(token)
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
