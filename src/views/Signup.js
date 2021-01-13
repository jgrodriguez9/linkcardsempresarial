import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
    UserOutlined,
    LockOutlined,
  } from '@ant-design/icons';
import app from "../firebaseConfig";
import { withRouter } from "react-router";
import Errores from "../components/Errores";
import * as Yup from 'yup';
import { Field, Formik } from "formik";
import firebase from 'firebase/app';
import 'firebase/auth'

const Signup = ({ setsignup, history }) => {
    const auth = firebase.auth();
    const [error, seterror] = useState("");
    const [submit, setSubmit] = useState(false)


    const shema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
          .required(),    
    });

    const handleSignUp = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;
        await app
            .auth()
            .createUserWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                history.push("/");
            })
            .catch(error => {
                seterror(error.message);
            });
    };
    return (
        <Formik
            initialValues={{email:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => {              
                auth.createUserWithEmailAndPassword(values.email, values.password)
                .then(response=>{
                    //console.log(response)
                    var user = response.user;
                    user.sendEmailVerification()
                    //setsignup(false)
                    seterror("Confirme su correo electrónico por favor")
                    setSubmitting(false)
                })
                .catch(error => {
                    //console.log(error)
                    // Handle Errors here.                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/weak-password') {
                        seterror("Contraseña muy débil.")
                    } else {
                        seterror(errorMessage)
                    }
                    setSubmitting(false)
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
        <Form onFinish={handleSubmit}>
            <Form.Item>
                <h1>Registro</h1>
            </Form.Item>
            {error? <Form.Item><Errores mensaje={error}/></Form.Item>:null}
            <Form.Item
                className="align-left"
                name="email" 
                rules={[
                    {
                        type: 'email',
                        message: 'Campo no es un email válido',
                    },
                    {
                      required: true,
                      message: 'Campo requerido',
                    },
                ]}                                              
            >
                <Input
                    prefix={
                        <UserOutlined />
                    }     
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}                
                    type="email"
                    placeholder="Registra un correo electrónico" 
                />
            </Form.Item>
            <Form.Item
                className="align-left"
                name="password" 
                rules={[
                    {
                      required: true,
                      message: 'Campo requerido',
                    },
                    {
                        min: 8,
                        message: 'Muy corto!',
                    },
                ]}                              
            >
                <Input
                    prefix={
                        <LockOutlined />
                    }     
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}                
                    type="password"
                    placeholder="Registra una Clave" 
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ marginRight: 10 }}
                >
                    Registrate
                </Button>
                O{" "}
                <Button onClick={() => setsignup(false)} type="link">
                    Ingresa ahora!
                </Button>
            </Form.Item>
        </Form>
        )}

        </Formik>




        
        
    );
};

export default withRouter(Signup);