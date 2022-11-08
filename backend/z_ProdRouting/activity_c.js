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
	console.log('>>> Cancello attività dalla lista');
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

exports.addStage = async (req, res, next) => {
	console.log('>>> Aggiungo fase all"attività');
	const activityId = req.body.activityId;
	const description = req.body.name;
	const no = req.body.no;
	try {
		const activity = await Activity.findOne({ _id: activityId });
		const newStage = new Stage({
			activityId: activityId,
			description: description,
			status: 'TODO',
			isActive: true,
		});
		await newStage.save();

		activity.stages.push({ stage: newStage._id, no: no, tasks: [] });
		await activity.normalizeNoSequence();
		await activity.save();

		const data = await Activity.findOne({ _id: activityId })
			.populate('stages.stage')
			.populate('stages.tasks.task');
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postDeleteStage = async (req, res, next) => {
	console.log('>>> Elimino STAGE da ACTIVITY');
	const activityId = req.body.activityId;
	const stageId = req.body.stageId;
	console.log({ stageId });
	try {
		const stage = await Stage.findOne({ _id: stageId });
		const activity = await Activity.findOne({ _id: activityId });
		const filteredActivity = activity.stages.filter(stage => {
			if (stage.stage == stageId) {
				console.log('Elimino operazioni collegate allo STAGE');
				stage.tasks.map(async task => {
					await Task.findByIdAndDelete(task.task);
				});
				return false;
			} else {
				return true;
			}
		});
		await stage.delete();

		activity.stages = filteredActivity;
		await activity.save();
		const data = await Activity.findOne({ _id: activityId })
			.populate('stages.stage')
			.populate('stages.tasks.task');
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.addTask = async (req, res, next) => {
	console.log('>>> Aggiungo perazione all"attività');
	const activityId = req.body.activityId;
	const stageId = req.body.stageId;
	const description = req.body.name;
	const no = req.body.no;
	try {
		const activity = await Activity.findOne({ _id: activityId });
		const newTask = new Task({
			activityId: activityId,
			stageId: stageId,
			description: description,
			status: 'TODO',
			isActive: true,
		});

		await newTask.save();

		activity.stages.map(stage => {
			if (stage._id == stageId) {
				stage.tasks.push({
					task: newTask._id,
					no: no,
				});
				resData = stage;
			}
		});
		activity.normalizeNoSequence();
		await activity.save();

		data = await Activity.findOne({ _id: activityId })
			.populate('stages.stage')
			.populate('stages.tasks.task');

		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postDeleteTask = async (req, res, next) => {
	console.log('>>> Elimino TASK dello STAGE in ACTIVITY');
	const activityId = req.body.activityId;
	const stageId = req.body.stageId;
	const taskId = req.body.taskId;
	try {
		const task = await Task.findOne({ _id: taskId });
		const activity = await Activity.findOne({ _id: activityId });
		activity.stages.map(stage => {
			if (stage._id == stageId) {
				const filteredTasks = stage.tasks.filter(task => {
					return task.task != taskId;
				});
				stage.tasks = filteredTasks;
			}
		});
		await activity.save();
		const t = await task.delete();
		console.log(t);
		const data = await Activity.findOne({ _id: activityId })
			.populate('stages.stage')
			.populate('stages.tasks.task');
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
