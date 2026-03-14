const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./modules/restaurants/restaurants.routes.js");
const authRoutes = require("./modules/auth/auth.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API atendimento SaaS rodando" });
});

module.exports = app;
