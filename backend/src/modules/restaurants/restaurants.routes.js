const express = require("express");
const router = express.Router();

const { createRestaurant } = require("./restaurants.controller.js");

router.post("/", createRestaurant);

module.exports = router;
