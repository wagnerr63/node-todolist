const jwt = require('jsonwebtoken');

class AuthMiddleware {

    async verifyJWT(request, response, next) {
        const token = request.headers['x-access-token'];
        if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
    
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        request.user_id = decoded.id;
        next();
        });
    }
}

module.exports = new AuthMiddleware();