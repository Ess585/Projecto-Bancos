'use strict'

const Favorite = require('../models/favorite.model');
const Usuario = require('../models/user.model');
const Cuenta = require('../models/cuenta.model');

const addFavorite = async(req, res) => {
    const { name, favoriteId, apodo, numberAccount, typeAccount } = req.body;
    try{
        const user = await Usuario.findById(name);
        if(!user){
            return res.status(404).json({
                message: 'No pudimos encontrar el Usuario que buscas.'
            })
        }

        const favoriteUser = await Usuario.findById(favoriteId);
        if(!favoriteUser) {
            return res.status(404).json({
                message: 'No pudimos encontrar el Usuario que buscas.'
            })
        }

        const cuenta = await Cuenta.findOne({ numberAccount, typeAccount});
        if(!cuenta){
            return res.status(404).json({
                message: 'No pudimos encontrar la cuenta.'
            })
        }

        const newfavorite = new Favorite({
            user: name,
            favorite: favoriteUser,
            apodo: apodo,
            account: cuenta._id
        });

        await newfavorite.save();

        res.status(200).json({
            message: 'Se ha realidazo la peticion correctamente', favorite
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al agregar como Favorito'
        })
    }
}

const readUserFav = async(req, res) => {
    try{
        const favorito = await Favorite.find();

        if(!favorito){
            res.status(400).send({
                message: 'No hay usuarios disponibles'
            })
        } else {
            res.status(200).json({
                favorito
            })
        }
    }catch(error){
        throw new Error(error);
    }
};

module.exports = { addFavorite, readUserFav }