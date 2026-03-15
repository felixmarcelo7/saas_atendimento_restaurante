const pool = require("../../config/database.js");

async function createProduct(req, res) {
  const { name, price, restaurant_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products(name, price, restaurant_id)
            VALUES($1, $2, $3)`,
      [name, price, restaurant_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
}

module.exports = {
  createProduct,
};
