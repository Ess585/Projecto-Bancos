import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const ListCuenta = () => {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        const getCuentas = async() => {
            const res = await axios.get("http://localhost:2005/api/list-cuenta", {
                headers: {
                    'x-token': `${token}`,
                },
            });
            console.log(res.data);
            if (Array.isArray(res.data.cuentas)) {
                setLista(res.data.cuentas);
            } 
        };
        getCuentas();
    }, []);

    console.log(lista)

    return (
        <div className="row">
            
        {lista.map((list) => (
        <div className="col-md-6 p-4" key={list._id}>
            <div className="card text-bg-dark">
                <span>Datos de la cuenta</span>
                <div className="card-body">
                <h5>No. Account: {list.numberAccount}</h5>
                </div>
                <div className="card-header">
                    <h5>Usuario: {list.nickname} </h5>
                </div>
                <div className="card-body">
                <h5>Saldo: {list.balance}</h5>
                </div>
                <div className="card-body">
                <h5>Tipo de Cuenta: {list.typeAccount}</h5>
                </div>
                <div className="card-body">
                <h5>Tipo de Banco: {list.typeBank}</h5>
                </div>
                <div className="card-body">
                <h5>Ingresos: {list.income}</h5>
                </div>
            </div>
        </div>
        ))}
    </div>
    );
};

export default ListCuenta;
