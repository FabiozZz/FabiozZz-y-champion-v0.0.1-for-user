const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const getAll = (req, res) => {
    Product.find()
        .exec()
        .then(products => res.send(products))
        .catch(err=>res.status(500).send(err))
};

const create = (req, res) => {
    Product.create(req.body)
        .then(createdProduct => res.send(createdProduct))
        .catch(err => res.status(500).send(err))
};

const update = (req, res) => {
    Product.findOneAndUpdate(
        {id: req.params.id}, req.body)
        .exec()
        .then(product => res.send(product))
        .catch(err => res.status(500).send(err))
};

const remove =     (req, res) => {
    Product.deleteOne(
        {id: req.params.id})
        .exec()
        .then(() => res.send({message: 'success'}))
        .catch(err => res.status(500).send(err))
}
module.exports = {
    getAll,
    create,
    update,
    remove
}