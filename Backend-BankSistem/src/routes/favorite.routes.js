'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { addFavorite, readUserFav } = require('../controllers/favorite.controller');

const api = Router();

api.post('/add-favorite', [
        check('numberAccount', 'El numero de cuenta es obligatorio').not().isEmpty(),
        check('email', 'El correo es un campo obligatorio').not().isEmpty(),
        validateParams,
    ], addFavorite
);

api.get('/list-Favorites', readUserFav)

module.exports = api;