const pool = require("../../config/database.js");

async function createTable(req, res) {
  const { table_number, restaurant_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tables (table_number, restaurant_id)
        VALUES($1, $2)
        RETURNING *`,
      [table_number, restaurant_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar mesa" });
  }
}

module.exports = {
  createTable,
};
