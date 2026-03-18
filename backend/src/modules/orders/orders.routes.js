const express = require("express");
const router = express.Router();

const { createOrder } = require("./orders.controller.js");

router.post("/", createOrder);

module.exports = router;
