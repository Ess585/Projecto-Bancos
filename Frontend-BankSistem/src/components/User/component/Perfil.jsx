import React from 'react';
import { useEffect } from 'react';
import { getOwnUser } from '../api/PerfilApi';
import { useState } from 'react';

import '../component/Perfil.css';

export const Perfil = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);


  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '1em' }}>
              <div className="row g-0">
                <div className="col-md-4  text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjEofX99GPaBBLF9NPxmpiDRHAmvY00shDnw&usqp=CAU"
                    alt="Avatar" className="img-fluid my-5" style={{ width: '10em' }} />
                  <p>USUARIO</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Información del usuario</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Nombre</h6>
                        <p className="text-muted">{user?.name}</p> {/* Verificación usando el operador de encadenamiento opcional */}
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user?.email}</p> {/* Verificación usando el operador de encadenamiento opcional */}
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Teléfono</h6>
                        <p className="text-muted">{user?.phone}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Teléfono</h6>
                        <p className="text-muted">{user?.nickname}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>DPI</h6>
                        <p className="text-muted">{user?.DPI}</p>
                      </div>
                    </div>
                    <hr className="mt-0 mb-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
