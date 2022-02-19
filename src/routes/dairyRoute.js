const express = require("express");
const router = express.Router();

const dairyController = require("../controllers/dairyController");
//get dairy of an user
router.get("/", dairyController.getDairy);

//get dairy by id
router.get("/:id", dairyController.getDairyById);

//create dairy
router.post("/", dairyController.addDairy);

module.exports = router;
