const express = require('express');

const modelCtrl = require('./model_c');

const router = express.Router();

//MODELS
router.get('/getList', modelCtrl.getModelsList);
router.post('/create', modelCtrl.postNewModel);

router.post('/addStage', modelCtrl.addStage);
router.post('/addTask', modelCtrl.addTask);
router.post('/deleteModel', modelCtrl.postDeleteModel);
router.post('/deleteStage', modelCtrl.postDeleteStage);
router.post('/deleteTask', modelCtrl.postDeleteTask);

module.exports = router;
