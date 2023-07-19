'use strict'
  const Transferencia = require ('../models/transferencia.model')
  const User = require ('../models/user.model')

const createTransferencias = async (req, res) => {
  const { cuentaOrigen, cuentaDestino, saldo, monto, descripcion } = req.body;

  try {
    let usuarioOrigen = await User.findOne({ cuentaOrigen });
    let usuarioDestino = await User.findOne({ cuentaDestino });

    if (!usuarioOrigen) {
      return res.status(404).send({
        msg: "El número de cuenta de origen no existe",
      });
    }

    if (!usuarioDestino) {
      return res.status(404).send({
        msg: "El número de cuenta de destino no existe",
      });
    }

    if (monto > 10000) {
      return res.status(400).send({
        msg:
          "No se puede realizar transacciones mayores a Q10,000",
      });
    }

    if (monto > usuarioOrigen.balance) {
      return res.status(404).send({
        msg:
          "El monto no coincide con su peticion",
      });
    }

    usuarioOrigen.balance - monto;
    usuarioDestino.balance + monto;

    await usuarioOrigen.save();
    await usuarioDestino.save();

    await User.updateOne(
      { acountNumber: cuentaOrigen },
      { $inc: { balance: -monto } }
    );
    await User.updateOne(
      { accountNumber: cuentaDestino },
      { $inc: { balance: monto } }
    );

    const transferencia = new Transferencia({
      cuentaOrigen: cuentaOrigen,
      saldo: saldo,
      cuentaDestino: cuentaDestino,
      monto: monto,
      descripcion: descripcion,
    });

    console.log(usuarioOrigen);
    console.log(usuarioDestino);

    const newTransferencia = await transferencia.save();

    if (!usuarioOrigen.transactions) {
      usuarioOrigen.transactions = [];
    }
    usuarioOrigen.transactions.push(newTransferencia);
    await usuarioOrigen.save();

    res.status(210).send({
      msg: "La Transferencia se realizo correctamente!",
      ok: true,
      transferencia: newTransferencia,
    });
  } catch (err) {
    console.log(err);
    console.log("Hubo un error");
  }
};

module.exports ={ createTransferencias }