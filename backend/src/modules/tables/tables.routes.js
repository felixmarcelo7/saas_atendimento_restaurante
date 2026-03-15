const express = require("express");
const router = express.Router();

const { createTable } = require("./tables.controller.js");

router.post("/", createTable);

module.exports = router;
