const pool = require("../../config/database.js");

async function createOrder(req, res) {
  const { table_id, user_id, restaurant_id, items } = req.body;

  const client = await pool.connect(); //precisamos criar essa conexão para realizar uma trasação
  //pois são feitas várias querys e elas precisam da mesma conexão

  try {
    await client.query("BEGIN"); //isso inicia a transação no banco

    const orderResult = await client.query(
      `INSERT INTO ordes(table_id, user_id, restaurant_id)
            VALUES($1, $2, $3)
            RETURNING *`,
      [table_id, user_id, restaurant_id],
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items(order_id, product_id, quantity)
            VALUES($1, $2, $3)`,
        [orderId, item.product_id, item.quantity],
      );
    }

    await client.query("COMMIT"); //confirma a transação deixando tudo permanente (salva no banco)

    res.status(201).json({
      order_id: orderId,
      message: "Pedido criado com sucesso",
    });
  } catch (error) {
    await client.query("ROLLBACK"); //se der um erro em um pedido toda a transação é desfeita (tudo ou nada)
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar pedido",
    });
  } finally {
    client.release(); //devolve a conexão para o pool
  }
}

module.exports = {
  createOrder,
};
