const express = require('express');

const activityCtrl = require('./activity_c');

const router = express.Router();

router.get('/getList', activityCtrl.getActivitisList);
router.get('/deleteActivity/:id', activityCtrl.deleteActivity);

router.post('/addStage', activityCtrl.addStage);
router.post('/addTask', activityCtrl.addTask);

router.post('/deleteTask', activityCtrl.postDeleteTask);
router.post('/deleteStage', activityCtrl.postDeleteStage);

module.exports = router;
