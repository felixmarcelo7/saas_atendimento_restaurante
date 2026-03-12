const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./modules/restaurants/restaurants.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API atendimento SaaS rodando" });
});

module.exports = app;
