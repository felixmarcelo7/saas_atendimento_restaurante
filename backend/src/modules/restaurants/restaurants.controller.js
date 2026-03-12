const pool = require("../../config/database.js");
const bcrypt = require("bcrypt");

async function createRestaurant(req, res) {
  //função que cria um novo login de restaurante
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO restaurants (name, email, password)
            VALUES($1, $2, $3)
            RETURNING id, name, email`,
      [name, email, password],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar restaurante" });
  }
}

module.exports = {
  createRestaurant,
};
