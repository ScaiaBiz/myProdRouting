const express = require('express');

const taskCtrl = require('./tasks_c');

const router = express.Router();

//MODELS
router.get('/getListFromSettings', taskCtrl.getListFromSettings);
router.post('/addToSettings', taskCtrl.addTaskToSettings);

router.get('/toggleVisibility/:id', taskCtrl.toggleTaskVisibility);

//ACTIVITY
router.get('/play/:id', taskCtrl.postPlay);
router.get('/pause/:id', taskCtrl.postPause);
router.get('/done/:id', taskCtrl.postDone);

module.exports = router;
