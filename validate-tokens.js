const axios = require('axios');

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const response = await axios.post('http://localhost:3001/api/validate-token', {}, {
            headers: { 'Authorization': token }
        });

        if (response.data.valid) {
            req.user = response.data.token.user; // Attach the user to the request object
            next();
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token validation failed', error: error.message });
    }
};

module.exports = validateToken;