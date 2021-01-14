const db = require('../../database');

class TodosRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT todos.*, users.name AS user_name
      FROM todos
      LEFT JOIN users ON users.id = todos.user_id
      ORDER BY todos.id ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT todos.*, users.name AS user_name
    FROM todos
    LEFT JOIN users ON users.id = todos.users
    WHERE todos.id = $1`, [id]);

    return row;
  }

  async create({
    name, status, user_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO todos(name, status, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [name, status, user_id]);

    return row;
  }

  async update(id, {
    name, status, user_id,
  }) {
    const [row] = await db.query(`
    UPDATE todos
    SET name = $1, status = $2, user_id = $3
    WHERE id = $4
    RETURNING *`, [name, status, user_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM todos WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new TodosRepository();
