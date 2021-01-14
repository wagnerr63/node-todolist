const UsersRepository = require('../repositories/UsersRepository');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

class AuthController {

    async login (request, response) {
        const {email, password } = request.body;
        
        const userByEmail = await UsersRepository.findByEmail(email);
        if (userByEmail && userByEmail.password===md5(password)) {
            const id = userByEmail.id;
            const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
            });
            return response.json({ auth: true, token: token });
        }

        response.status(500).json({message: 'Invalid login!'});
    }

    async logout (request, response) {
        response.json({auth: false, token: null});
    }

}

module.exports = new AuthController();