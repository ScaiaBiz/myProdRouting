const HttpError = require('../O_models/m_error');

const Task = require('../O_models/m_task');
const Setting = require('../O_models/m_settings');

exports.getListFromSettings = async (req, res, next) => {
	console.log('>>> Richiesta nomi TASK');
	try {
		const data = await Setting.findOne({ name: 'Tasks' });
		if (!data) {
			res.status(201).json([]);
		}
		res.status(201).json(data.value);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.addTaskToSettings = async (req, res, next) => {
	console.log('>>> Ricevo nuovo nome TASK');
	try {
		const newValue = req.body.value;
		const setting = await Setting.findOne({ name: 'Tasks' });
		if (!setting) {
			const data = new Setting({ name: 'Tasks', value: [newValue] });
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
	console.log('>>> Modifica visibilità TASK');
	const taskId = req.params.id;

	try {
		const tasks = await Setting.findOne({ name: 'Tasks' });
		let r;
		tasks.value.map(task => {
			if (task._id == taskId) {
				task.isActive = !task.isActive;
				r = task;
			}
			return task;
		});

		await tasks.save();
		res.status(201).json(r);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
