const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post();

module.exports = router;
