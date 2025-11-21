import mysql from 'mysql';

export const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "FirstHumans"
});

db.connect((err) => {
	if(err) throw Error(err);
	console.log('БД подкючена');
})