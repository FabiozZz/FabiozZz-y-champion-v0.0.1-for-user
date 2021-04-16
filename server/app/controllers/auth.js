const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {secret} = require('../../config/app').jwt;
const authHelper = require('../helpers/authHelpers');
const User = mongoose.model('User');
const Token = mongoose.model('Token');

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();

    return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
        .then(()=>({
            accessToken,
            refreshToken: refreshToken.token
        }))
};
const getAll = (req, res) => {
    User.find()
        .exec()
        .then(products => res.send(products))
        .catch(err=>res.status(500).send(err))
};

const sign = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email}).exec()
        .then(user => {
            if (!user) {
                res.status(401).send({message: 'Пользователь не найден!'})
            }
            const isValid = bcrypt.compare(password, user.password);
            if (isValid) {
                updateTokens(user._id).then(tokens=>res.send({user,tokens}))
            }else{
                res.status({message: 'Неверный email или пароль'});
            }
        }).catch(err=>res.status(500).send({message: err.message}))
};

const refreshTokens = (req, res) => {
    const {refreshToken} = req.body;
    let payload;
    try{
        payload = jwt.verify(refreshToken, secret);
        console.log(payload);
        if (payload.type !== 'refresh') {
            res.status(400).send({message: 'Invalid Token!'})
            return;
        }
    }catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).send({message: 'Token expired!'});
            return;
        }else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).send({message: 'Invalid token!'});
            return;
        }
    }
    Token.findOne({tokenId:payload.id})
        .exec()
        .then(token=>{
            if (token === null) {
                throw new Error('Invalid token!');
            }
            return updateTokens(token.userId);
        }).then(tokens=>res.send(tokens))
        .catch(err=>res.status(400).send({message: err.message}))
};

const create = (req, res) => {
    console.log(req.body)
    const {password} = req.body;
    const newPassword = bcrypt.hashSync(password,5);
    User.create({...req.body,password:newPassword})
        .then(newUser => res.send(newUser))
        .catch(err => res.status(500).send(err))
};

module.exports = {
    sign,create,refreshTokens,getAll
}