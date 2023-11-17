const express = require("express");
const AuthController = require("../app/controllers/AuthController");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/me", AuthController.me);
router.get("/user/:id", AuthController.getUserById);

module.exports = router;
