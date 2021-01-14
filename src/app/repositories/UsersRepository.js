const db = require('../../database');

class UsersReposity {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM users ORDER BY name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    return row;
  }

  async create({ 
    name, email, passwordMD5 
  }) {
    const [row] = await db.query(`
    INSERT INTO users(name, email, password)
    VALUES($1, $2, $3)
    RETURNING *
    `, [name, email, passwordMD5]);

    return row;
  }

  async update(id, { 
    name, email, passwordMD5 
  }) {
    const [row] = await db.query(`
    UPDATE users
    SET name = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING *
    `, [name, email, passwordMD5, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new UsersReposity();
