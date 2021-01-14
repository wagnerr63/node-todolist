const TodosRepository = require('../repositories/TodosRepository');

class TodoController {
  async index(request, response) {
    const { orderBy } = request.query;
    const todos = await TodosRepository.findAll(orderBy);

    response.json(todos);
  }

  async show(request, response) {
    const { id } = request.params;

    const todo = await TodosRepository.findById(id);

    if (!todo) {
      return response.status(404).json({ error: 'Todo not found' });
    }

    response.json(todo);
  }

  async store(request, response) {
    const {
      name, status, user_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!status) {
      return response.status(400).json({ error: 'Status is required' });
    }

    if (!user_id) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const todo = await TodosRepository.create({
      name, status, user_id,
    });

    response.json(todo);
  }

  async update(request, response) {
    const { id } = request.params
    const {
      name, status, user_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!status) {
      return response.status(400).json({ error: 'Status is required' });
    }

    if (!user_id) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const todo = await TodosRepository.update(id, {
      name, status, user_id,
    });

    response.json(todo);
  }

  async delete(request, response) {
    const { id } = request.params;

    await TodosRepository.delete(id);
    // 204: No content
    response.sendStatus(204);
  }
}
// Singleton
module.exports = new TodoController();
