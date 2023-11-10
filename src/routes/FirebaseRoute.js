const express = require("express");
const FirebaseController = require("../app/controllers/FirebaseController");
const router = express.Router();

router.post("/update", FirebaseController.update);

module.exports = router;
