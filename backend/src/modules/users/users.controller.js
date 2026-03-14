const pool = require("../../config/database.js");
const bcrypt = require("bcrypt");

async function createUsers(req, res) {
  const { name, email, password, restaurant_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, restaurant_id)
            VALUES ($1, $2, $3, 4$)
            RETURNING id, name, email`,
      [name, email, hashedPassword, restaurant_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

module.exports = {
  createUsers,
};
