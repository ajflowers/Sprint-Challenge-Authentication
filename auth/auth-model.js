const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findByUser
};

function add(user) {
    return db('users')
        .insert(user);
};

function find() {
    return db('users').select();
};

function findByUser(username) {
    return db('users')
        .where({username})
        .first();
};