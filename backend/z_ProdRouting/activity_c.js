const HttpError = require('../O_models/m_error');

const Activity = require('../O_models/m_activity');
const Stage = require('../O_models/m_stage');
const Task = require('../O_models/m_task');

exports.getActivitisList = async (req, res, next) => {
	console.log('>>> Richiesta lista attività');

	const querry = {
		status: { $ne: 'DONE' },
	};

	try {
		const data = await Activity.find()
			.populate('stages.stage')
			.populate('stages.tasks.task');
		console.log(data);
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.deleteActivity = async (req, res, next) => {
	const activityId = req.params.id;
	try {
		const act = await Activity.findOne({ _id: activityId });

		const stages = await Stage.find({ activityId: activityId });
		stages?.map(s => {
			s.delete();
		});
		const tasks = await Task.find({ activityId: activityId });
		tasks?.map(t => {
			t.delete();
		});

		act.delete();

		res.status(201).json(act);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
