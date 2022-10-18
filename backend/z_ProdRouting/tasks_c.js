const HttpError = require('../O_models/m_error');

const Task = require('../O_models/m_task');
const Setting = require('../O_models/m_settings');

exports.getListFromSettings = async (req, res, next) => {
	console.log('>>> Richiesta nomi TASK');
	try {
		const data = await Setting.findOne({ name: 'Tasks' });
		console.log(data);
		if (data.value.length > 0) {
			res.status(201).json(data.value);
		}
		res.status(201).json([]);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.addTaskToSettings = async (req, res, next) => {
	console.log('>>> Ricevo nuovo nome TASK');
	console.log(req);
	try {
		const newValue = req.body.value;
		console.log(newValue);
		const setting = await Setting.findOne({ name: 'Tasks' });
		let data;
		if (!setting) {
			data = new Setting({ name: 'Tasks', value: [newValue] });
			try {
				await data.save();
				res.status(201).json(data);
			} catch (error) {
				next(new HttpError('Un TASK con lo stesso nome esiste già', 404));
			}
		} else {
			await setting.addSettingElement(newValue);
			await setting.save();
			res.status(201).json(setting.value);
		}
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
