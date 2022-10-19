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
			},
		],
	},
	isActive: { type: Boolean },
});

routeModelSchema.methods.normalizeNoSequence = function normalizeNoSequence() {
	console.log('>>> ROUTE_MODEL: > Normalizzo ordine di sequenza');
	console.log(this);
	let stageNo = 10000;
	let taskNo = 10000;
	this.stages.map(stage => {
		stage.no = stageNo;
		stage.tasks.map(task => {
			task.no = taskNo;
			taskNo += 10000;
		});
		stageNo += 10000;
	});
};

module.exports = mongoose.model('RouteModel', routeModelSchema);
