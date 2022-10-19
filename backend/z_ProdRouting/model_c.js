const HttpError = require('../O_models/m_error');

const Setting = require('../O_models/m_settings');
const Model = require('../O_models/m_routeModel');
const Stage = require('../O_models/m_stage');
const Task = require('../O_models/m_task');

exports.getModelsList = async (req, res, next) => {
	console.log('>>> Richiesta MODELLI');

	try {
		const data = await Model.find();
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postNewModel = async (req, res, next) => {
	console.log('>>> Creazione nuovo modello');

	try {
		const newModel = await new Model({
			name: req.body.name,
			isActive: req.body.isActive,
		});

		await newModel.save();

		res.status(201).json(newModel);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
