const express = require('express');

const activityCtrl = require('./activity_c');

const router = express.Router();

router.get('/getList', activityCtrl.getActivitisList);
router.get('/deleteActivity/:id', activityCtrl.deleteActivity);

module.exports = router;
