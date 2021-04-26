const type = require('../utils/constants');
export const userLogIn = (user) => ({type: type.LOG_IN,user});
export const userLogOut = () => ({type: type.LOG_OUT});