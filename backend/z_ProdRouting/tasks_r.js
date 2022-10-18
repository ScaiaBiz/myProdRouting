const express = require('express');

const taskCtrl = require('./tasks_c');

const router = express.Router();

//MODELS
router.get('/getListFromSettings', taskCtrl.getListFromSettings);
router.post('/addToSettings', taskCtrl.addTaskToSettings);

module.exports = router;
