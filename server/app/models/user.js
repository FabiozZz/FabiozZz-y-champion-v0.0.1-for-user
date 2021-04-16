const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    email: String,
    password: String,
    fullName:String,
    phone:String,
    birthDay:String,
    optionSale:String
});
mongoose.model('User',UserShema);
