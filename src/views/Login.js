import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function Login(){
    
    const [signup, setSignup] = useState(false);


    return(
        <div className="bg-login">
            <Container>
                <Row className="align-items-center pt-5 pt-8">
                    <LoginForm signup={signup}/>
                </Row>
                {/* <Row>
                    <Col md={{ span: 6, offset: 3 }} xl={{span: 6, offset: 3}} lg="6" xs="12" className="my-auto py-2 text-center">
                        {
                            !signup ? <label>¿No tiene cuenta? <span className="text-decoration-underline cursor-pointer" onClick={e => setSignup(true)}>Regístrate</span> </label>
                            : <span className="text-decoration-underline cursor-pointer" onClick={e => setSignup(false)}>Iniciar sesión</span>

                        }
                        
                    </Col>
                </Row> */}
            </Container>
        </div>
        
    )
    
}

export default Login