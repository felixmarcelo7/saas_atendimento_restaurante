const express = require("express");
const router = express.Router();

const { createUsers } = require("./users.controller.js");

router.post("/", createUsers);

module.exports = router;
