const express = require("express");
const router = express.Router();
const {addSweetController,viewAllSweetsController} = require("../controllers/sweetControllers");


router.post("/",addSweetController);
router.get('/',viewAllSweetsController);

module.exports = router;