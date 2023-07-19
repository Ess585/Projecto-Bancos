import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { readRol } from "./ApiRol";

const Navbar = () => {
  

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
    //navigate("/");
  };


  const [click, setClick] = useState(false)

  const [rol, setRol] = useState(false);
  useEffect(() => {

    const rolAdmin = async() => {
      try {

        const rol = await readRol();
        console.log(rol);
        if(rol === 'ADMINB'){
          setRol(true)
        }

      } catch (error) {
        console.error(error)
      }
    }

    rolAdmin();

  }, [])

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  
  
  const CrearCuenta = ()=>{
    return(
      <li>
        <Link to="/account" onClick={closeMobileMenu}>
          <p>Crear Account</p> 
        </Link>
      </li>
    )
  }
  const crearUsuario =()=> {
    return(
      <li>
        <Link to='/USER' onClick={closeMobileMenu}>
          <p>Crear Cliente</p>
        </Link>
      </li>
    )
  }

  const listarCuentas =()=>{
    return (
      <li>
        <Link to='/listAccount' onClick={closeMobileMenu}>
          <p>Accounts</p>
        </Link>
      </li>
    )
  }
  return (
    <>
      <nav className="navbar">
        <div className="container flex_space">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : " fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to="/home" onClick={closeMobileMenu}>
                <p>Principal</p>
              </Link>
            </li>
            <li>
              <Link to="/usuarios" onClick={closeMobileMenu}>
                <p>Clientes</p>
              </Link>
            </li>
            <li>
              <Link to="/transferencias" onClick={closeMobileMenu}>
                <p>Transacciones</p>
              </Link>
            </li>
            
            <li>
              <Link to='/perfil' onClick={closeMobileMenu}>
                <p>Perfil</p>
              </Link>
            </li>
            {rol && crearUsuario()}
            {rol && CrearCuenta()}
            {rol && listarCuentas()}
            
          </ul>
          
          <div className="login-area flex">
            <li>
              {/*Se quito CONTACT*/}
              <Link>
                <button onClick={cerrarSesion} className="primary-btn">
                  <p>Logout</p>
                </button>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      
    </>
  );
}

export default Navbar