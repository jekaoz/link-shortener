const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'});
        }
        // console.log('token', token);
        // console.log('jwt.verify', jwt.verify)

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded;

        next();
    } catch (e) {
        console.error('AUTH_MIDDLEWARE_FAILED', e)
        return res.status(401).json({message: 'Нет авторизации'});
    }
};
