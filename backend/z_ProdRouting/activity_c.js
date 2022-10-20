const HttpError = require('../O_models/m_error');

const Activity = require('../O_models/m_activity');

exports.getActivitisList = async (req, res, next) => {
	console.log('>>> Richiesta lista attività');

	const querry = {
		status: { $ne: 'DONE' },
	};

	try {
		const data = await Activity.find();
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
