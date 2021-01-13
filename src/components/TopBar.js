import React from 'react'
import { Navbar } from 'react-bootstrap'
import 'firebase/auth'
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg'

function TopBar(){
    
    return(
        <Navbar bg="light" expand="lg" className="py-2 bg-celeste">
        <NavLink exact to="/anderson" className="navbar-brand px-3"><img src={logo} alt="Logo" /></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <NavLink exact to="/anderson" className="px-2 cl-white ft-top" activeClassName="active">Inicio</NavLink>
            <NavLink exact to="/anderson/tarjetas" className="px-2 cl-white ft-top" activeClassName="active">Tarjetas</NavLink>
            <NavLink exact to="/anderson/top-tarjetas" className="px-2 cl-white ft-top" activeClassName="active">Estadísticas</NavLink>            
        </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar