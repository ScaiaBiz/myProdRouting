const express = require('express');

const stagesCtrl = require('./stages_c');

const router = express.Router();

//MODELS
router.get('/getListFromSettings', stagesCtrl.getListFromSettings);
router.post('/addToSettings', stagesCtrl.addTaskToSettings);

router.get('/toggleVisibility/:id', stagesCtrl.toggleTaskVisibility);

module.exports = router;
