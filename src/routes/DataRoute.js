const express = require("express");
const DataController = require("../app/controllers/DataController");
const router = express.Router();

router.post("/update", DataController.update);
router.get("/all/:id", DataController.getAllByUserID);

module.exports = router;
