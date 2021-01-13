import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import imgAnderson from '../images/andersons.png';
import userDefault from '../images/userdefault.png'
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { AiOutlineReload } from "react-icons/ai";
import useQuery from '../hook/useQuery';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TarjetaForm({auth, firebaseDB}){
    //console.log(firebaseDB)
    const [ciudades, setCiudades] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [puestos, setPuestos] = useState([])
    const [tarjeta, setTarjeta] = useState('')
    const [errorsTarjeta, setErrorsTarjeta] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const query = useQuery()
    let tarjetaCode = query.get('tarjeta');
    const [optionsTarjetas, setOptionsTarjetas] = useState([])
    const [optLoad, setOptLoad] = useState(true)

    const [initialValues, setInitialValues] = useState({
        id: '', 
        cumpleanos: '',
        celular: '',
        correo: '',
        nombre: '',
        apellidos: '',
        foto: '',
        ciudad: '',        
        empresa: '',
        puesto: '',
    });

    useEffect(() => {
        //console.log(tarjetaCode)        
        const ciudadData = async () =>{
            const citiesDB = firebaseDB.collection('aciudad').doc("ciudades");
            const citiesCollection = await citiesDB.get();
            //console.log(citiesCollection.data().items)
            setCiudades(citiesCollection.data().items);
        }
        const empresaData = async () =>{
            const empresaDB = firebaseDB.collection('aempresa').doc("empresas");
            const empresaCollection = await empresaDB.get();
            //console.log(citiesCollection.data().items)
            setEmpresas(empresaCollection.data().items);
        }
        const puestoData = async () =>{
            const puestoDB = firebaseDB.collection('apuesto').doc("puestos");
            const puestoCollection = await puestoDB.get();
            //console.log(citiesCollection.data().items)
            setPuestos(puestoCollection.data().items);
        }

        if(tarjetaCode){
            setTarjeta(tarjetaCode)
            const trabajadorData = async () =>{
                const trabajadorDB = firebaseDB.collection("atrabajador")
                const trabajadorCollection = await trabajadorDB.where("tarjeta", '==', tarjetaCode).limit(1).get();
                if(!trabajadorCollection.empty){
                    trabajadorCollection.forEach(doc=>{
                        //console.log(doc)
                        //console.log(doc.data())
                        const entity = {                            
                            correo: doc.data().correo,
                            nombre: doc.data().nombre,
                            apellidos: doc.data().apellidos,
                            foto: doc.data().foto,
                            ciudad: doc.data().ciudad,        
                            empresa: doc.data().empresa,
                            puesto: doc.data().puesto,
                            cumpleanos: doc.data().cumpleanos,
                            celular: doc.data().celular,
                        }
                        setInitialValues(entity)
                    })
                }else{
                    //console.log("empty")
                }
                setLoading(false)
            }
            trabajadorData();

        }else{
            setLoading(false)
            //setOptLoad(true)
            const tarjetaData = async () =>{
                const tarjetaDB = firebaseDB.collection('atarjeta')
                const tarjetaCollection = await tarjetaDB.where('disponible', '==', true).get();
                if(!tarjetaCollection.empty){
                    let arr = []
                    tarjetaCollection.forEach(doc => {
                        arr.push(
                            { value: doc.id, label: doc.id },
                        )
                        //setTarjeta(doc.id)
                    });
                    setOptionsTarjetas(arr)
                    //setOptLoad(false)
                }else{
                    setErrorsTarjeta(true)
                }        
            }

            tarjetaData()
        }
        ciudadData()
        empresaData()
        puestoData()
        
    },[]);

    // const refreshCode = e =>{
    //     firebaseDB.collection('atarjeta').where('disponible', '==', true).limit(1).get()
    //     .then(response=>{
    //         //console.log(response.empty)
    //         if(!response.empty){
    //             setErrorsTarjeta(false)
    //             response.forEach(doc => {
    //                 setTarjeta(doc.id)
    //             }); 
    //         }else{
    //             setErrorsTarjeta(true)
    //         }
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })
    // }

    const shemaValidate = Yup.object().shape({
        // cumpleanos: Yup.string()
        //     .required('Campo Requerido'),
        // celular: Yup.string()
        //     .required('Campo Requerido'),
        // correo: Yup.string()
        //     .required('Campo Requerido'),
        nombre: Yup.string()
            .required('Campo Requerido'),
        apellidos: Yup.string()
            .required('Campo Requerido'),
        ciudad: Yup.string()
            .required('Campo Requerido'),        
        empresa: Yup.string()
            .required('Campo Requerido'),
        // puesto: Yup.string()
        //     .required('Campo Requerido'),
    });

    const customStyles = {
        control: styles => ({ ...styles, borderColor: 'red' }),
      }

    return(
        <>
            <ToastContainer />
            <Row className="mt-5 px-3">
                <Col>
                    <h4 className="tittle-tarjeta">Asignar tarjeta</h4>
                </Col>
            </Row>
            <Row className="mt-5 px-3 mb-2">
                <Col xs="4" md="4">
                    <Card className="border-0">
                    <Card.Img variant="top" src={imgAnderson} className="imgCard" />
                    <Image src={userDefault} rounded className="avatarCard pr-2"/>
                    <Card.Body>
                        <Row className="mt-4 text-center">
                            <Col>
                                <h5 className="font-weight-bold cl-blue-dark mb-1 mt-3">
                                    {
                                        initialValues.nombre ? `${initialValues.nombre} ${initialValues.apellidos}` : 'Nuevo trabajador'
                                    }
                                </h5>
                                <small className="text-muted mb-3 d-block">{initialValues.puesto ? initialValues.puesto : "Sin puesto"}</small>
                                {/* <h5 className="font-weight-bold cl-blue-dark mb-1">1200</h5>
                                <small className="text-muted mb-3 d-block">IMPRESIONES</small> */}
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs="8" md="8">
                    {isLoading ? <Card.Body>Loading</Card.Body> :
                        <Formik
                            initialValues={initialValues}
                            validationSchema={shemaValidate}
                            onSubmit={(values, { setSubmitting, setFieldValue,setFieldError }) => {    
                                if(tarjeta===''){
                                    setErrorsTarjeta(true)
                                }else{
                                    const d = {
                                        tarjeta: tarjeta.trim(),                                        
                                        correo: values.correo,
                                        nombre: values.nombre,
                                        apellidos: values.apellidos,
                                        foto: '',
                                        ciudad: values.ciudad,        
                                        empresa: values.empresa,
                                        puesto: values.puesto,
                                        cumpleanos: values.cumpleanos,
                                        celular: values.celular,
                                    }
                                    if(tarjetaCode){
                                        firebaseDB.collection("atrabajador").where("tarjeta", '==', tarjetaCode).limit(1).get()
                                        .then(response=>{
                                            //console.log('update')
                                            const idDocument = response.docs[response.docs.length - 1].id;
                                            firebaseDB.collection("atrabajador").doc(idDocument).set({
                                                correo: values.correo,
                                                nombre: values.nombre,
                                                apellidos: values.apellidos,
                                                foto: '',
                                                ciudad: values.ciudad,        
                                                empresa: values.empresa,
                                                puesto: values.puesto,
                                                cumpleanos: values.cumpleanos,
                                                celular: values.celular,
                                            }, { merge: true });
                                            toast.success("Salvado correctamente", {autoClose: 3000})
                                            
                                        })
                                        .catch(error=>{
                                            //console.log(error)
                                        })

                                    }else{
                                        const tarjetaRef = firebaseDB.collection("atarjeta").doc(tarjeta)
                                        tarjetaRef.get()
                                        .then(response=>{
                                            //console.log('response')
                                            //console.log(response)   
                                            //console.log(response.data()) 
                                            tarjetaRef.update({
                                                disponible: false,
                                                fecha_activacion: new Date()
                                            })  
                                            
                                            firebaseDB.collection("atrabajador").add(d)
                                            .then(response=>{
                                                //console.log(response)
                                                toast.success("Salvado correctamente", {autoClose: 3000})
                                            })
                                            .catch(error=>{
                                                //console.log(error)
                                            })
                                        })
                                        .catch(error=>{
                                            //console.log(error)
                                        })
                                    }
                                }                                                                      
                            }}
                        >{({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                        })=>(
                            <Form onSubmit={handleSubmit}>
                                <Card className="border-0"> 
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col xs="12" lg="3">
                                                <span className={`${errorsTarjeta && 'error-tarjeta'} tr-id font-weight-bold`}>ID de tarjeta </span>
                                            </Col>
                                            <Col xs="12" lg="5">
                                                {
                                                    tarjetaCode ? <span className="tr-code">{tarjeta}</span> :
                                                    <Select 
                                                        options={optionsTarjetas} 
                                                        styles={errorsTarjeta ? customStyles : ''}
                                                        placeholder="Buscar ..."
                                                        onChange={e=>{
                                                            setTarjeta(e.value)
                                                            setErrorsTarjeta(false)
                                                        }}
                                                    />
                                                }
                                            </Col>
                                            {/* <Col xs="12" md="12">
                                                <div>
                                                    <span className={`${errorsTarjeta && 'error-tarjeta'} tr-id pr-5 font-weight-bold`}>ID de tarjeta </span>
                                                    <span className="tr-code">{tarjeta}</span>
                                                    {!tarjetaCode && <span className="mb-2 ml-4"><Button variant="light" size="sm" type="button" onClick={e=>refreshCode()}><AiOutlineReload /></Button> </span>}
                                                    <input type="hidden" value={tarjeta} />
                                                </div>                                    
                                            </Col> */}
                                        </Row>
                                        <Row className="mt-5">                                            
                                            <Col xs="5" md="5">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Correo</Form.Label>
                                                    <Field 
                                                        type="email"
                                                        className={`${errors.correo && 'input-error'} form-control input-default`}
                                                        name="correo"
                                                    />
                                                    {errors.correo && <Form.Control.Feedback type="invalid" >{errors.correo}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="3" md="3">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Celular</Form.Label>
                                                    <Field 
                                                        type="text"
                                                        className={`${errors.celular && 'input-error'} form-control input-default`}
                                                        name="celular"
                                                    />
                                                    {errors.celular && <Form.Control.Feedback type="invalid" >{errors.celular}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="4" md="4">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Cumpleaños</Form.Label>
                                                    <Field 
                                                        type="date"
                                                        className={`${errors.cumpleanos && 'input-error'} form-control input-default`}
                                                        name="cumpleanos"
                                                    />
                                                    {errors.cumpleanos && <Form.Control.Feedback type="invalid" >{errors.cumpleanos}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="6" md="6">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Nombre(s)</Form.Label>
                                                    <Field 
                                                        type="text"
                                                        className={`${errors.nombre && 'input-error'} form-control input-default`}
                                                        name="nombre"
                                                    />
                                                    {errors.nombre && <Form.Control.Feedback type="invalid" >{errors.nombre}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="6" md="6">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Apellidos</Form.Label>
                                                    <Field 
                                                        type="text"
                                                        className={`${errors.apellidos && 'input-error'} form-control input-default`}
                                                        name="apellidos"
                                                    />
                                                    {errors.apellidos && <Form.Control.Feedback type="invalid" >{errors.apellidos}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="4" md="4">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Ciudad</Form.Label>
                                                    <Field as="select" name="ciudad"  className={`${errors.ciudad && 'input-error'} form-control input-default`}>
                                                        <option>Seleccionar opción</option>
                                                        {
                                                            ciudades.length > 0 &&
                                                            ciudades.map((item,i)=>(
                                                                <option value={item} key={i}>{item}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors.ciudad && <Form.Control.Feedback type="invalid" >{errors.ciudad}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="4" md="4">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Empresa</Form.Label>
                                                    <Field as="select" name="empresa"  className={`${errors.empresa && 'input-error'} form-control input-default`}>
                                                        <option>Seleccionar opción</option>
                                                        {
                                                            empresas.length > 0 &&
                                                            empresas.map((item,i)=>(
                                                                <option value={item} key={i}>{item}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors.empresa && <Form.Control.Feedback type="invalid" >{errors.empresa}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="4" md="4">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Puesto</Form.Label>
                                                    <Field as="select" name="puesto"  className={`${errors.puesto && 'input-error'} form-control input-default`}>
                                                        <option>Seleccionar opción</option>
                                                        {
                                                            puestos.length > 0 &&
                                                            puestos.map((item,i)=>(
                                                                <option value={item} key={i}>{item}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors.puesto && <Form.Control.Feedback type="invalid" >{errors.puesto}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xs="12" md="12" className="text-right">
                                                <Button variant="light btn-save" type="submit" className="px-3 w-25 border-lg">Guardar</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Form>
                        )}
                        </Formik>
                    }   
                </Col>
            </Row>
        </>
    );
}

export default TarjetaForm