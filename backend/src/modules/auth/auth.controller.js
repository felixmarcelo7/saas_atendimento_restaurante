const pool = require("../../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM  restaurants WHERE email = $1", //busca o email no banco de dados
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválida" });
    }

    const restaurant = result.rows[0]; //pega o restaurante no banco de dados e compara a senha
    const passwordMatch = await bcrypt.compare(password, restaurant.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email ou senha inválida" });
    }

    const token = jwt.sign(
      //criado token de autenticação
      { restaurantId: restaurant.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      //retorno da resposta
      token,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no login" });
  }
}

module.exports = {
  login,
};
