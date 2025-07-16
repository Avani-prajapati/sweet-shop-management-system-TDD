const express = require("express");
const router = express.Router();
const {addSweetController,viewAllSweetsController,updateSweetController} = require("../controllers/sweetControllers");


router.post("/",addSweetController);
router.get('/',viewAllSweetsController);
router.put('/:id',updateSweetController);



module.exports = router;