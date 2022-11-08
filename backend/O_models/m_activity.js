const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
	modelName: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, required: true },
	dueDate: { type: Date, required: true },
	endDate: { type: Date },
	totalWorkedMinutes: { type: Number },
	totalWorkedTime: { type: Number },
	stages: [
		{
			stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
			no: { type: Number, required: true },
			tasks: [
				{
					task: { type: Schema.Types.ObjectId, ref: 'Task' },
					no: { type: Number, required: true },
				},
			],
		},
	],
});

activitySchema.methods.normalizeNoSequence = function normalizeNoSequence() {
	console.log('>>> ACTIVITY: > Normalizzo ordine di sequenza');
	let stageNo = 10000;
	let taskNo = 10000;
	this.stages.sort((a, b) => {
		return a.no - b.no;
	});
	this.stages.map(stage => {
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

module.exports = mongoose.model('Activity', activitySchema);
