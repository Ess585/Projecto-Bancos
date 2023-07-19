import React, { useState } from 'react';
import axios from 'axios';
import './Transf.css'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"

const TransferForm = () => {
    const navigate = useNavigate();    
    const [cuentaOrigen, setCuentaOrigen] = useState('');
    const [cuentaDestino, setCuentaDestino] = useState('');
    const [monto, setMonto] = useState();
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post('http://localhost:2005/api/transfers', {
        cuentaOrigen,
        cuentaDestino,
        monto,
        descripcion,
    });

    if (response) {
        Swal.fire({
            icon: 'success',
            title: 'La transferencia fue creada exitosamente',
            showConfirmButton: false,
            timer: 1500
        }).then((r) => {
            if (r.isConfirmed) {
                navigate('/listAccount')
            } else {
                navigate('/listAccount')
            }
        });
    }
    } catch (error) {
    setMensaje(error.response.data.msg);
      // Aquí puedes manejar el error de la transferencia
    }
    };

    return (
    <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="cuentaOrigen" className="form-label">
            <p>Cuenta de Origen:</p>
        </label>
        <input
            type="text"
            placeholder='Escribe el número de cuenta que quieras'
            className="form-control"
            id="cuentaOrigen"
            value={cuentaOrigen}
            onChange={(e) => setCuentaOrigen(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="cuentaDestino" className="form-label">
            <p>Cuenta de Destino:</p>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder='Número de cuenta de la persona'
            id="cuentaDestino"
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="monto" className="form-label">
            <p>Monto:</p>
        </label>
        <input
            type="number"
            placeholder='Cantidad a transferir'
            className="form-control"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="descripcion" className="form-label">
            <p>Descripción:</p>
        </label>
        <input
            type="text"
            placeholder='Comentale a detalle...'
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
        />
        </div>
        <button type="submit" className="btn btn-primary">Realizar Transferencia</button>
    </form>
    {mensaje && <p>{mensaje}</p>}
    </div>
);
}

export default TransferForm;