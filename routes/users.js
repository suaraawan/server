var express = require('express');
var router = express.Router();
const userController = require("../controllers/users.js");


router
  .get("/", userController.getUsers)
  .post("/signup", userController.signUp)
  .post("/signin", userController.signIn)

module.exports = router;
