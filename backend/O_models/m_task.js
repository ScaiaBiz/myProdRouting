const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
	stageId: { type: Schema.Types.ObjectId, ref: 'Stage', required: true },
	description: { type: String, require: true },
	isActive: { type: Boolean, default: true },
	startDate: { type: Date },
	startEndDate: { type: Date },
	breaksTime: { type: Number, default: 0 },
	workedTime: { type: Number, default: 0 },
	creationDate: { type: Date },
	notes: [],
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Task', taskSchema);
