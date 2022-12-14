const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//-------------------------Imports
// >>> Import models
const HttpError = require('./O_models/m_error');

//-------------------------Import routers

const prodRoutingTaskRts = require('./z_ProdRouting/tasks_r');
const prodRoutingStageRts = require('./z_ProdRouting/stages_r');
const prodRoutingModelsRts = require('./z_ProdRouting/model_r');
const prodRoutingActivityRts = require('./z_ProdRouting/activity_r');

//-------------------------Set main var
const testing = true;

if (testing) {
	console.log('Modalità test!');
}

const port = 3107;
const appName = 'myProdRouting';

MONGODB_URI = `mongodb://localhost:27017/${appName}`;
const SRV_PORT = process.env.PORT || port;

//-------------------------Start Express
const app = express();
app.use(cors());
app.use(express.json());

//-------------------------Eval Routes
app.use('/test', (req, res, next) => {
	res.status(201).json('Sembra tutto ok, sembra tutto OK!');
});
app.use('/prodRouting/Tasks', prodRoutingTaskRts);
app.use('/prodRouting/Stages', prodRoutingStageRts);
app.use('/prodRouting/Models', prodRoutingModelsRts);
app.use('/prodRouting/Activitis', prodRoutingActivityRts);

// >>> Error Handler
// Check Route
app.use((req, res, next) => {
	return next(
		new HttpError('Indirizzo non trovato: ' + req.method + ' ' + req.url, 404)
	);
});

// Send Error Message
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	return res.status(error.code || 500).json({
		message: error.message || 'Errore non identificato',
		errorStatus: true,
	});
});

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected!'))
	.then(result => {
		app.listen(SRV_PORT);
		console.log('Server up and running on port: ' + SRV_PORT);
	})
	.catch(err => {
		console.log(err);
	});
