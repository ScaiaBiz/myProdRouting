const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	activityId: { type: Schema.Types.ObjectId, ref: 'Activity', require: true },
	stageId: { type: Schema.Types.ObjectId, ref: 'Stage', require: true },
	description: { type: String },
	isActive: { type: Boolean, default: true, required: true },
	status: { type: String, required: true, default: 'TODO' },
	startDate: { type: Date },
	startBreak: { type: Date },
	endDate: { type: Date },
	breaksTime: { type: Number, default: 0 },
	workedTime: { type: Number, default: 0 },
	creationDate: { type: Date },
	notes: [],
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Task', taskSchema);
