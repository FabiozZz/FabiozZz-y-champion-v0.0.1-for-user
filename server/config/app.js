module.exports = {
    mongoUri: 'mongodb://localhost:27017/online',
    jwt:{
        secret: 'ne vse mogut v IT',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '2m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '3m'
            }
        },
    }
}