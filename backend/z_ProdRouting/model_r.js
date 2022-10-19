const express = require('express');

const modelCtrl = require('./model_c');

const router = express.Router();

//MODELS
router.get('/getList', modelCtrl.getModelsList);
router.post('/create', modelCtrl.postNewModel);

module.exports = router;
