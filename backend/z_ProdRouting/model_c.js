const HttpError = require('../O_models/m_error');

const Setting = require('../O_models/m_settings');
const Model = require('../O_models/m_routeModel');
const Activity = require('../O_models/m_activity');
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

exports.addStage = async (req, res, next) => {
	console.log('>>> Aggiungo fase al modello');
	const modelId = req.body.modelId;
	try {
		const model = await Model.findOne({ _id: modelId });

		const newStage = { no: req.body.no, name: req.body.name };

		model.addStage(newStage);
		model.normalizeNoSequence();

		data = await model.save();

		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
exports.addTask = async (req, res, next) => {
	console.log('>>> Aggiungo fase al modello');
	const modelId = req.body.modelId;
	const stageId = req.body.stageId;
	try {
		const model = await Model.findOne({ _id: modelId });

		const newTask = { no: req.body.no, name: req.body.name };

		model.addTask(stageId, newTask);
		model.normalizeNoSequence();

		data = await model.save();

		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postDeleteModel = async (req, res, next) => {
	console.log('>>> Elimino modello');
	const modelId = req.body.modelId;
	try {
		await Model.findOneAndDelete({ _id: modelId });
		res.status(201).json('Cancellato correttamente MODELLO');
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postDeleteStage = async (req, res, next) => {
	console.log('>>> Elimino STAGE dal modello');
	const modelId = req.body.modelId;
	const stageId = req.body.stageId;
	try {
		const model = await Model.findOne({ _id: modelId });
		const filteredStages = model.route.stages.filter(stage => {
			return stage._id != stageId;
		});
		model.route.stages = [...filteredStages];
		await model.save();
		res.status(201).json('Cancellato correttamente FASE');
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
exports.postDeleteTask = async (req, res, next) => {
	console.log('>>> Elimino TASK dello STAGE dal modello');
	const modelId = req.body.modelId;
	const stageId = req.body.stageId;
	const taskId = req.body.taskId;
	try {
		const model = await Model.findOne({ _id: modelId });
		model.route.stages.map(stage => {
			if (stage._id == stageId) {
				const filteredTasks = stage.tasks.filter(task => {
					return task._id != taskId;
				});
				stage.tasks = filteredTasks;
			}
		});
		await model.save();
		res.status(201).json('Cancellato correttamente OPERAZIONE');
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.postCreateActivityFromModel = async (req, res, next) => {
	console.log('>>> Creo nuova ATTIVITA');
	const modelId = req.body.modelId;
	const dueDate = new Date(req.body.dueDate);
	const description = req.body.description;
	try {
		const model = await Model.findOne({ _id: modelId });

		const newActivity = new Activity({
			modelName: model.name,
			description: description,
			status: 'TODO',
			dueDate: dueDate,
			stages: [],
		});

		model.route.stages.map(async stage => {
			const newStage = new Stage({
				activityId: newActivity._id,
				description: stage.name,
				status: 'TODO',
			});

			newActivity.stages.push({
				stage: newStage._id,
				no: stage.no,
				tasks: [],
			});
			stage.tasks.map(async task => {
				console.log('Task descrtiption: ' + task.name);
				const newTask = new Task({
					description: task.name,
					isActive: true,
					status: 'TODO',
					activityId: newActivity._id,
					stageId: newStage._id,
				});
				newActivity.stages.map(na_stage => {
					console.log(na_stage.stage == newStage._id);
					if (na_stage.stage == newStage._id) {
						na_stage.tasks.push({
							task: newTask._id,
							no: task.no,
						});
					}
				});
				await newTask.save();
			});
			await newStage.save();
		});
		await newActivity.save();
		res.status(201).json('Tutto bene');
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};
