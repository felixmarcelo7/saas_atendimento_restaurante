const express = require("express");
const router = express.Router();

const { createRestaurant } = require("./restaurants.controller.js");

router.post("/", createRestaurant);
console.log(createRestaurant);

module.exports = router;
