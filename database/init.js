const { initializeApp } = require('@firebase/app');
require('dotenv').config();

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId,
};

try {
	initializeApp(firebaseConfig);
	console.log('Conectado ao banco de dados');
}
catch (error) {
	console.error(error);
}