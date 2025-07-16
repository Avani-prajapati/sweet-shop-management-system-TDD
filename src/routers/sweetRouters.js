const express = require("express");
const router = express.Router();
const {addSweetController} = require("../controllers/sweetControllers");

router.post("/",addSweetController);

module.exports = router;