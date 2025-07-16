const express = require("express");
const router = express.Router();
const {addSweetController,viewAllSweetsController,updateSweetController,deleteSweetController} = require("../controllers/sweetControllers");


router.post("/",addSweetController);
router.get('/',viewAllSweetsController);
router.put('/:id',updateSweetController);
router.delete('/:id',deleteSweetController);



module.exports = router;