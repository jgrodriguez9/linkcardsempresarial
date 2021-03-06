import React, { useContext, useState } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup';
import firebase from 'firebase/app';
import 'firebase/auth'
import "firebase/firestore"
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import logoLogin from '../images/logoLogin.svg'


function IniciarSesion({setSignup}){
    const [message, setMessage] = useState('')
    const { setAuthData } = useContext(authContext)
    const auth = firebase.auth()
    const firebaseDB = firebase.firestore();
    const history = useHistory()
    
    const shema = Yup.object().shape({
        email: Yup.string()
            .required("Campo requerido"),
        password: Yup.string()
          .required("Campo requerido"),    
    });
    

    return(
            <Formik initialValues={{email:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                //console.log(values)
                auth.signInWithEmailAndPassword(values.email, values.password)
                .then(response=>{                    
                    //console.log(response)
                    //console.log(response)

                    //validamos que este en la base datos y tenga permiso para accesar
                    firebaseDB.collection("lke_usuarios").where('email', '==', values.email).where('cliente', '==', process.env.REACT_APP_CLIENTE).limit(1).get()
                    .then(res=>{
                        if(!res.empty){
                            res.forEach(item=>{
                                if(item.data().activo){
                                    setAuthData(response.user)
                                    history.push("/empresas/minerva")
                                }else{
                                    auth.signOut()
                                    setMessage("Su usuario no está activado")                                    
                                }
                            })
                        }else{
                            auth.signOut()
                            setMessage("No se encuentra el usuario")                            
                        }      
                        setSubmitting(false)                  
                    }).catch(er=>{
                        auth.signOut()
                        setMessage("Ocurrió un error. Intente nuevamente por favor.") 
                        setSubmitting(false)                           
                    })             
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
                
                    <Card className="shadow px-5 pb-4 pt-0 rounded-lg mt-8 border-0">                           
                        <Card.Body className="text-center">
                            <Image src={logoLogin} alt="logo" fluid className="w-75 m-auto"/>


                            <span className="text-danger d-block">{message}</span> 
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
                                        <div className="form-group my-4">
                                            <Field 
                                                className={`${errors.email && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9 outline-0`}
                                                name="email" 
                                                type="email"
                                                placeholder="Correo electrónico" 
                                            />
                                            { errors.email && <div className="invalid-feedback d-block">{errors.email}</div> }  
                                        </div>
                                        <div className="form-group mb-5">
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
    )
}

export default IniciarSesion