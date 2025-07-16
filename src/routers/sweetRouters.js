const express = require("express");
const router = express.Router();
const {
    addSweetController,
    viewAllSweetsController,
    updateSweetController,
    deleteSweetController,
    searchSweetController
} = require("../controllers/sweetControllers");


router.post("/",addSweetController);
router.get('/',viewAllSweetsController);
router.put('/:id',updateSweetController);
router.delete('/:id',deleteSweetController);
router.get("/search", searchSweetController);


module.exports = router;