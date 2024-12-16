const express = require("express");
const { signUp, logIn } = require("../src/services/UserRegister");

const router = new express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;
