const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeModelSchema = new Schema({
	name: { type: String, required: true, unique: true },
	route: {
		stages: [
			{
				no: { type: Number },
				name: { type: String },
				tasks: [
					{
						no: { type: Number },
						name: { type: String },
						commonNote: [],
					},
				],
				commonNote: [],
				isModel: { type: Boolean, default: true, required: true },
			},
		],
	},
	isActive: { type: Boolean },
});

routeModelSchema.methods.addStage = function addStage(stage) {
	console.log('Provo ad aggiungere STAGE nel MODELLO');
	this.route.stages.push(stage);
};
routeModelSchema.methods.addTask = function addTask(stageId, task) {
	console.log('Provo ad aggiungere TASK per lo sTAGE nel MODELLO');
	console.log(this);
	this.route.stages.map(stage => {
		if (stage._id == stageId) {
			stage.tasks.push(task);
		}
	});
};

routeModelSchema.methods.normalizeNoSequence = function normalizeNoSequence() {
	console.log('>>> ROUTE_MODEL: > Normalizzo ordine di sequenza');
	console.log(this);
	let stageNo = 10000;
	let taskNo = 10000;
	this.route.stages.sort((a, b) => {
		return a.no - b.no;
	});
	this.route.stages.map(stage => {
		stage.no = stageNo;
		stage.tasks.sort((a, b) => {
			return a.no - b.no;
		});
		stage.tasks.map(task => {
			task.no = taskNo;
			taskNo += 10000;
		});
		stageNo += 10000;
	});
};

module.exports = mongoose.model('RouteModel', routeModelSchema);
