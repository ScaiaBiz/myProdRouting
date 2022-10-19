const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingSchema = new Schema({
	name: { type: String, required: true, unique: true },
	value: [
		{
			description: { type: String },
			isActive: { type: Boolean },
			id: { type: Number },
		},
	],
});

settingSchema.methods.addSettingElement = function addElement(v) {
	console.log('Provo ad aggiungere elemento al settaggio');
	// console.log(this);
	// console.log({ v });
	this.value.push(v);
	// console.log(this);
};

module.exports = mongoose.model('Setting', settingSchema);
