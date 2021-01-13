import React, { useContext, useState } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup';
import firebase from 'firebase/app';
import 'firebase/auth'
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaFacebookSquare, FaApple, FaGoogle } from "react-icons/fa";
import facebook from '../images/Facebook.svg';
import apple from '../images/Apple.svg';
import googlePlus from '../images/GooglePlus.svg';


function IniciarSesion({setSignup}){
    const [message, setMessage] = useState('')
    const { setAuthData } = useContext(authContext)
    const auth = firebase.auth()
    const history = useHistory()
    
    const shema = Yup.object().shape({
        email: Yup.string()
            .required(),
        password: Yup.string()
          .required(),    
    });
    

    return(
        <Row>
            <Col md={{ span: 6, offset: 3 }} xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} xs="12" className="my-auto">
            <Formik initialValues={{email:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                //console.log(values)
                auth.signInWithEmailAndPassword(values.email, values.password)
                .then(response=>{
                    setSubmitting(false)
                    //console.log(response)
                    //console.log(response)
                    //validamos que halla confirmado su email
                    var user = response.user;
                    setAuthData(response.user)
                    history.push("/anderson")
                    /* if(user.emailVerified){
                        setAuthData(response.user)
                        history.push("/")
                    }else{
                        setMessage("Confirme su correo electrónico por favor")
                    }    */               
                })
                .catch(error => {
                    setSubmitting(false)
                    //console.log(error)
                    // Handle Errors here.                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode==='auth/user-not-found') {
                        setMessage("No se encuentra el usuario")
                    } else if(errorCode ==='auth/wrong-password'){
                        setMessage("Contraseña incorrecta")
                    } 
                    else {
                        setMessage(errorMessage)
                    }
                    // ...
                  });
            }}
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
        }) => (
            <form className="user" onSubmit={handleSubmit}>
                
                    <Card className="shadow-xs px-5 py-4 rounded-xl mt-8 border-0">                           
                        <Card.Body>
                            <span className="text-danger">{message}</span> 
                            <Row>
                                {/* <Col md="12">
                                    <div className="d-flex justify-content-between">
                                        <div><img src={facebook}  alt="Login Facebook" className="h-logo"/></div>
                                        <div><img src={apple}  alt="Login Apple" className="h-logo"/></div>
                                        <div><img src={googlePlus}  alt="Login GooglePlus" className="h-logo"/></div>
                                    </div>
                                </Col>
                                <Col md="12" className="py-3">
                                    <div className="d-flex justify-content-between">
                                        <div className="line"></div>
                                        <div><span className="font-weight-bold">ó</span></div>
                                        <div className="line"></div>
                                    </div>
                                </Col> */}
                                <Col md="12">
                                    <div>
                                        <div className="form-group">
                                            <Field 
                                                className={`${errors.email && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9 outline-0`}
                                                name="email" 
                                                type="email"
                                                placeholder="Correo electrónico" 
                                            />
                                            { errors.email && <div className="invalid-feedback d-block">{errors.email}</div> }  
                                        </div>
                                        <div className="form-group">
                                            <Field 
                                                className={`${errors.password && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9 outline-0`}
                                                name="password" 
                                                type="password"
                                                placeholder="Contraseña" 
                                            />
                                            { errors.password && <div className="invalid-feedback d-block">{errors.password}</div> }  
                                                                                                                    
                                        </div>
                                        <Button variant="secondary" className="btn-block my-4 btn-login" type="submit" disabled={isSubmitting}>
                                            {
                                                isSubmitting 
                                                ?  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                                : 'Empezar'
                                            }
                                        </Button> 
                                    </div>
                                </Col>
                            </Row>                            
                        </Card.Body>
                    </Card>                    
                </form> 
            
            )}
            </Formik>                                     
        </Col> 
        </Row>        
    )
}

export default IniciarSesion