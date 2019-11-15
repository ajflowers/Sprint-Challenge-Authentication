const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findById
};

function add(user) {
    return db('users')
        .insert(user);
};

function find() {
    return db('users').select();
};

function findById(id) {
    return db('users')
        .where({id})
        .first();
};