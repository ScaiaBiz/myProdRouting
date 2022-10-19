const express = require('express');

const taskCtrl = require('./tasks_c');

const router = express.Router();

//MODELS
router.get('/getListFromSettings', taskCtrl.getListFromSettings);
router.post('/addToSettings', taskCtrl.addTaskToSettings);

router.get('/toggleVisibility/:id', taskCtrl.toggleTaskVisibility);

module.exports = router;
