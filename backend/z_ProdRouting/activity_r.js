const express = require('express');

const activityCtrl = require('./activity_c');

const router = express.Router();

router.get('/getList', activityCtrl.getActivitisList);

module.exports = router;
