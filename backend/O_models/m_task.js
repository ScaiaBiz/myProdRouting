const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	description: { type: String, require: true, unique: true },
	isActive: { type: Boolean, default: true, required: true },
	activityId: { type: Schema.Types.ObjectId, ref: 'Activity', require: true },
	stageId: { type: Schema.Types.ObjectId, ref: 'Stage', require: true },
	status: { type: String, required: true, default: 'TODO' },
	startDate: { type: Date },
	startEndDate: { type: Date },
	breaksTime: { type: Number, default: 0 },
	workedTime: { type: Number, default: 0 },
	creationDate: { type: Date },
	notes: [],
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Task', taskSchema);
