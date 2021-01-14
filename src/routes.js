const { Router } = require('express');
const { route } = require('express/lib/router');

const AuthController = require('./app/controllers/AuthController');
const AuthMiddleware = require('./app/middlewares/AuthMiddleware');

const TodoController = require('./app/controllers/TodoController');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

router.get('/todos', AuthMiddleware.verifyJWT, TodoController.index);
router.get('/todos/:id',  AuthMiddleware.verifyJWT, TodoController.show);
router.delete('/todos/:id', AuthMiddleware.verifyJWT, TodoController.delete);
router.post('/todos', AuthMiddleware.verifyJWT,TodoController.store);
router.put('/todos/:id', AuthMiddleware.verifyJWT,TodoController.update);

router.get('/users', AuthMiddleware.verifyJWT, UserController.index);
router.post('/users', UserController.store);
router.put('/users/:id', AuthMiddleware.verifyJWT, UserController.update);
router.delete('/users/:id', AuthMiddleware.verifyJWT, UserController.delete);

module.exports = router;
