const { Router } = require("express");
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
router.post("/signup", authController.registerNewUser);

module.exports = router;
