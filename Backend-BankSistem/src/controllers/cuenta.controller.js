'use strict';
const Cuenta = require('../models/cuenta.model');

const createCuenta = async (req, res) => {
    try {
    const { name, nickname, balance ,income, typeAccount, typeBank } = req.body;
    const userId = req.user._id;
    const newCuenta = new Cuenta({
        name: userId,
        nickname,
        balance,
        typeAccount,
        typeBank,
        income,
    });

    await newCuenta.save();
    return res.status(201).json({
        message: "Cuenta creada Correctamente",
        ok: true,
        cuenta: newCuenta,
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Hubo un error",
        ok: false,
        error: error.message,
        });
    }
};

    const listCuentas = async (req, res) => {
    try {
        if (!req.user || !req.user.rol) {
            return res.status(401).json({
                message: "Usted no es ADMINB",
                ok: false,
            });
        }

        const isAdminB = req.user.rol === "ADMINB";

        if (!isAdminB) {
            return res.status(401).json({
                message: "Esta funcion solo la puede realizar el ADMIN de la App",
                ok: false,
            });
        }

        const cuentas = await Cuenta.find();
        return res.status(200).json({
            cuentas,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Hubo un error",
            ok: false,
            error: error.message,
        });
    }
};

const deleteCuenta = async (req, res) => {
    try {
    const cuentaId = req.params.id;
    const cuenta = await Cuenta.findById(cuentaId);
    if (!cuenta) {
        return res.status(404).json({
        message: 'La cuenta que buscas no existe.',
        ok: false,
        });
    }

    await Cuenta.findByIdAndDelete(cuentaId);
    return res.status(200).json({
        message: 'Cuenta Eliminada!',
        ok: true,
    });
        
    } catch (error) {
    console.error(error);
        return res.status(500).json({
            message: 'Hubo un error',
            ok: false,
            error: error.message,
        });
    }
};

module.exports = { createCuenta, listCuentas, deleteCuenta };