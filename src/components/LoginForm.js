import React from 'react'
import { Col } from 'react-bootstrap';
import IniciarSesion from './IniciarSesion';
import Registrarse from './Registrarse';

function LoginForm({signup}){
        

    return(
        <Col lg="5">
            {
                !signup 
                ? <IniciarSesion signup={signup}/>
                : <Registrarse signup={signup}/>
            }
        </Col>
        
    )
}

export default LoginForm