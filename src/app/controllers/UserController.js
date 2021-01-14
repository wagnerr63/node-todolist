const UsersRepository = require('../repositories/UsersRepository');
const md5 = require('md5');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);

    response.json(users);
  }

  // Error Handler (Middleware do Express)

  async store(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);
    if (userByEmail) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    let passwordMD5 = md5(password);

    const user = await UsersRepository.create({ name, email, passwordMD5 });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    let passwordMD5 = md5(password);

    const user = await UsersRepository.update(id, { name, email, passwordMD5 });
    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    await UsersRepository.delete(id);
    // 204: No content
    response.sendStatus(204);
  }
}

module.exports = new UserController();
