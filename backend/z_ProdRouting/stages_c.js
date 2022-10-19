const HttpError = require('../O_models/m_error');

const Stages = require('../O_models/m_stage');
const Setting = require('../O_models/m_settings');

exports.getListFromSettings = async (req, res, next) => {
	console.log('>>> Richiesta nomi STAGE');
	try {
		const data = await Setting.findOne({ name: 'Stages' });
		// console.log(data);
		if (!data) {
			res.status(201).json([]);
		}
		res.status(201).json(data.value);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.addTaskToSettings = async (req, res, next) => {
	console.log('>>> Ricevo nuovo nome STAGE');
	try {
		const newValue = req.body.value;
		const setting = await Setting.findOne({ name: 'Stages' });
		if (!setting) {
			const data = new Setting({ name: 'Stages', value: [newValue] });
			try {
				await data.save();
				res.status(201).json(data.value);
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

exports.toggleTaskVisibility = async (req, res, next) => {
	console.log('>>> Modifica visibilità STAGE');
	const stageId = req.params.id;

	try {
		const stages = await Setting.findOne({ name: 'Stages' });
		let r;
		stages.value.map(stage => {
			if (stage._id == stageId) {
				stage.isActive = !stage.isActive;
				r = stage;
			}
			return stage;
		});

		await stages.save();
		res.status(201).json(r);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
