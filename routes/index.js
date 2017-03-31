var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var mainController = require('../controllers/main.controller')
var dogsController = require('../controllers/dogs.controller')

/* GET home page. */
router.get('/', mainController.renderIndex);


module.exports = router;

//get all dogs
router.get('/thelist', dogsController.getAllDogs)

// add new dog - GET
router.get('/newdog', dogsController.addNewDogGET)

//add new dog - POST
router.post('/adddog', dogsController.addNewDogPOST)
