const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({//o pool cria várias conexões para ser mais rápida 
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Conectado ao PostgreSQL");
  })
  .catch((err) => {
    console.error("erro ao conectar no banco:", err);
  });

module.exports = pool;
