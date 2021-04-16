const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app').jwt;

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).send({message: 'Token not Provided'})
        return;
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, secret);
        if (payload.type!=='access') {
            res.status(400).send({message: 'Invalid token!'});
            return;
        }
    } catch (e){
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).send({message: 'Token expired!'});
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).send({message: 'Invalid token!'});
            return;
        }
    }
    next();
};
