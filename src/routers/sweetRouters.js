const express = require("express");
const router = express.Router();
const {
    addSweetController,
    viewAllSweetsController,
    updateSweetController,
    deleteSweetController,
    searchSweetController,
    purchaseSweetController,
    updateStockController
} = require("../controllers/sweetControllers");


router.post("/",addSweetController);
router.get('/',viewAllSweetsController);
router.put('/:id',updateSweetController);
router.delete('/:id',deleteSweetController);
router.get("/search", searchSweetController);
router.post("/purchase/:id", purchaseSweetController);


module.exports = router;