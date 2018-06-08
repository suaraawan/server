const express = require('express');
const router = express.Router();
const { getUsers, signUp, signIn } = require("../controllers/users");

router.get("/", getUsers)
router.post("/signup", signUp)
router.post("/signin", signIn)

module.exports = router;
