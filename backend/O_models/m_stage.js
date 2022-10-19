const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
	activityId: { type: Schema.Types.ObjectId, ref: 'Activity', require: true },
	description: { type: String, require: true, unique: true },
	isActive: { type: Boolean, default: true, require: true },
	startDate: { type: Date },
	startEndDate: { type: Date },
	workedTime: { type: Number, default: 0 },
	creationDate: { type: Date },
	notes: [],
});

// activitySchema.methods.updateActivity = function (activity) {};

module.exports = mongoose.model('Stage', stageSchema);
