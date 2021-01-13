import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup';
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button } from 'react-bootstrap';


function Registrarse({setMessage, signup}){
    const auth = firebase.auth();
    const shema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
          .required(),    
    });

    return(
        <Formik initialValues={{email:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => {                 
                auth.createUserWithEmailAndPassword(values.email, values.password)
                .then(response=>{
                    //console.log(response)
                    var user = response.user;
                    user.sendEmailVerification()
                    signup(false)
                    setMessage("Confirme su correo electrónico por favor")
                    setSubmitting(false)
                })
                .catch(error => {
                    //console.log(error)
                    // Handle Errors here.                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/weak-password') {
                        setMessage("Contraseña muy débil.")
                    } else {
                        setMessage(errorMessage)
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
            <form className="user" onSubmit={handleSubmit}>
                <div className="form-group">
                    <Field 
                        className={`${errors.email && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9`}
                        name="email" 
                        type="email"
                        placeholder="Correo electrónico" 
                    />
                    { errors.email && <div className="invalid-feedback">{errors.email}</div> }  
                </div>
                <div className="form-group">
                    <Field 
                        className={`${errors.password && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9`}
                        name="password" 
                        type="password"
                        placeholder="contraseña" 
                    />
                    { errors.password && <div className="invalid-feedback">{errors.password}</div> }  
                                                                                              
                </div>
                <Button variant="secondary" className="btn-block" type="submit">
                    {
                        isSubmitting 
                        ?  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                        : 'Registrarse'
                    }
                </Button>
            </form>
        )}

        </Formik>
    )

}

export default Registrarse