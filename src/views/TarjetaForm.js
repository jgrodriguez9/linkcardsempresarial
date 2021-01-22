import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import userDefault from '../images/default.png'
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import useQuery from '../hook/useQuery';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import LoaderRequest from '../loader/LoaderRequest';
import VistaEstadisticaForm from '../components/VistaEstadisticaForm';
import { MdEdit } from "react-icons/md";
import firebase from 'firebase/app'
import 'firebase/storage'

function TarjetaForm({auth, firebaseDB}){
    //console.log(firebaseDB)
    const storage = firebase.storage()
    const [ciudades, setCiudades] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [puestos, setPuestos] = useState([])
    const [paises, setPaises] = useState([])
    const [tarjeta, setTarjeta] = useState('')
    const [errorsTarjeta, setErrorsTarjeta] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const query = useQuery()
    let tarjetaCode = query.get('tarjeta');
    const [optionsTarjetas, setOptionsTarjetas] = useState([])
    const history = useHistory();
    const [isSubmiting, setSubmiting] = useState(false);
    const [vista, setVista] = useState("perfil")
    const [socialList, setSocialList] = useState([])
    const [visitas, setVisitas] = useState(0)

    const [initialValues, setInitialValues] = useState({
        apellidos: '',
        biografia: '',
        celular: '',
        ciudad: '', 
        cliente: '',
        cumpleanos: '',
        cumpleanos_activo: false,
        direccion: '',
        direccion_activa: false,        
        email: '',
        empresa: '',
        imagen: {key: '', url: ''},
        nombre: '',
        pais: '',
        puesto: '',
        tarjeta: ''
    });

    useEffect(() => {
        //console.log(tarjetaCode)        
        const ciudadData = async () =>{
            const citiesDB = firebaseDB.collection('lke_ciudad').doc("ciudades");
            const citiesCollection = await citiesDB.get();
            //console.log(citiesCollection.data().items)
            setCiudades(citiesCollection.data().items);
        }
        const empresaData = async () =>{
            const empresaDB = firebaseDB.collection('lke_trabaja').doc("trabajos");
            const empresaCollection = await empresaDB.get();
            //console.log(citiesCollection.data().items)
            setEmpresas(empresaCollection.data().items);
        }
        const puestoData = async () =>{
            const puestoDB = firebaseDB.collection('lke_puestos').doc("puestos");
            const puestoCollection = await puestoDB.get();
            //console.log(citiesCollection.data().items)
            setPuestos(puestoCollection.data().items);
        }
        const paisData = async () =>{
            const paisDB = firebaseDB.collection('lke_pais').doc("paises");
            const paisesCollection = await paisDB.get();
            //console.log(citiesCollection.data().items)
            setPaises(paisesCollection.data().items);
        }

        if(tarjetaCode){
            setTarjeta(tarjetaCode)
            const trabajadorData = async () =>{
                const trabajadorDB = firebaseDB.collection("lke_trabajador")
                const trabajadorCollection = await trabajadorDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                               .where("tarjeta", '==', tarjetaCode).limit(1).get();
                if(!trabajadorCollection.empty){
                    trabajadorCollection.forEach(doc=>{
                        //console.log(doc)
                        //console.log(doc.data())
                        setSocialList(doc.data().social_list)
                        setVisitas(doc.data().visitas)
                        const entity = {    
                            apellidos: doc.data().apellidos,
                            biografia: doc.data().biografia,
                            celular: doc.data().celular,
                            ciudad: doc.data().ciudad, 
                            cliente: doc.data().cliente,
                            cumpleanos: doc.data().cumpleanos,
                            cumpleanos_activo: doc.data().cumpleanos_activo,
                            direccion: doc.data().direccion,
                            direccion_activa: doc.data().direccion_activa,        
                            email: doc.data().email,
                            empresa: doc.data().empresa,
                            imagen: doc.data().imagen,
                            nombre: doc.data().nombre,
                            pais: doc.data().pais,
                            puesto: doc.data().puesto,
                            tarjeta: doc.data().tarjeta    
                        }
                        setImgUserUrl(doc.data().imagen.url)
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
                const tarjetaDB = firebaseDB.collection('lke_tarjeta')
                const tarjetaCollection = await tarjetaDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                         .where('disponible', '==', true).get();
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
        paisData()
        
    },[]);

    const shemaValidate = Yup.object().shape({
        apellidos: Yup.string()
            .required('Campo Requerido'),
        biografia: Yup.string()
            .required('Campo Requerido'),
        celular: Yup.string()
            .required('Campo Requerido'),
        ciudad: Yup.string()
            .required('Campo Requerido'),
        cumpleanos: Yup.string()
            .required('Campo Requerido'),
        direccion: Yup.string()
            .required('Campo Requerido'),   
        email: Yup.string()
            .required('Campo Requerido'),
        empresa: Yup.string()
            .required('Campo Requerido'),
        nombre: Yup.string()
            .required('Campo Requerido'),
        pais: Yup.string()
            .required('Campo Requerido'),
        puesto: Yup.string()
            .required('Campo Requerido'),
    });

    const customStyles = {
        control: styles => ({ ...styles, borderColor: 'red' }),
      }

    const [showModalImg, setShowModalImg] = useState(false)
    const handleClose = () => setShowModalImg(false);
    const handleShow = () => setShowModalImg(true);
    const [imgUser, setImgUser] = useState(null)
    const [imgUserUrl, setImgUserUrl] = useState(null)

    const handleUploadImg = () =>{
        if(imgUser.type === "image/png" || imgUser.type === "image/jpg" || imgUser.type === "image/svg" || imgUser.type === "image/jpeg"){
            setImgUserUrl(URL.createObjectURL(imgUser))
            setShowModalImg(false)
        }
    }

    return(
        <>
         {  isSubmiting && LoaderRequest() }
            <ToastContainer />
            <Modal show={showModalImg} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="d-block">Nueva imagen</label>
                        <input type="file" onChange={e=>setImgUser(e.target.files[0])} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleUploadImg}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
            <Row className="mt-5 px-3">
                <Col>
                    <h4 className="tittle-tarjeta">Asignar tarjeta</h4>
                </Col>
            </Row>
            <Row className="mt-5 px-3 mb-2">
                <Col xs="4" md="4">
                    <Card className="border-0">
                    <Card.Img variant="top" src={imgUserUrl ? imgUserUrl : userDefault} className="imgCard" />
                    <div className="edit-pic" onClick={handleShow}><MdEdit className="cursor-pointer text-primary"/></div>                    
                    <Card.Body>
                        <Row className="mt-4 text-center">
                            <Col>
                                <h5 className="font-weight-bold cl-blue-dark mb-1 mt-3">
                                    {
                                        initialValues.nombre ? `${initialValues.nombre} ${initialValues.apellidos}` : 'Nuevo Empleado'
                                    }
                                </h5>
                                <small className="text-muted mb-3 d-block">{initialValues.puesto ? initialValues.puesto : "Puesto"}</small>
                                {/* <h5 className="font-weight-bold cl-blue-dark mb-1">1200</h5>
                                <small className="text-muted mb-3 d-block">IMPRESIONES</small> */}
                            </Col>
                        </Row>
                        {tarjetaCode && <Row className="mt-3 justify-content-center">                            
                            <Col xs="9" lg="6">
                                <Button variant={vista==="perfil" ? "info" : "outline-info"} block onClick={e=>setVista("perfil")}>Perfil</Button>
                            </Col>
                        </Row>}
                        {tarjetaCode && <Row className="my-3 justify-content-center">
                            <Col xs="9" lg="6">
                                <Button variant={vista==="estadistica" ? "info" : "outline-info"} block onClick={e=>setVista("estadistica")}>Estadíticas</Button>
                            </Col>
                        </Row>}
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs="8" md="8">
                    {isLoading ? <Card.Body>Loading</Card.Body> :
                        vista === "perfil" ? 
                        <Formik
                            initialValues={initialValues}
                            validationSchema={shemaValidate}
                            onSubmit={(values, { setSubmitting, setFieldValue,setFieldError }) => {    
                                if(tarjeta===''){
                                    setErrorsTarjeta(true)
                                }else{
                                    setSubmiting(true)
                                    const d = {
                                        visitas: 0,
                                        apellidos: values.apellidos,
                                        biografia: values.biografia,
                                        celular: values.celular,
                                        ciudad: values.ciudad,
                                        cliente: process.env.REACT_APP_CLIENTE,
                                        cumpleanos: values.cumpleanos,
                                        cumpleanos_activo: values.cumpleanos_activo,
                                        direccion: values.direccion,
                                        direccion_activa: values.direccion_activa,        
                                        email: values.email,
                                        empresa: values.empresa,
                                        imagen: {key: null, url: null},
                                        nombre: values.nombre,
                                        pais: values.pais,
                                        puesto: values.puesto,
                                        social_list: [],
                                        tarjeta: tarjeta.trim()                                        
                                    }
                                    if(tarjetaCode){
                                        firebaseDB.collection("lke_trabajador").where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                                               .where("tarjeta", '==', tarjetaCode).limit(1).get()
                                        .then(response=>{
                                            //console.log('update')
                                            response.forEach(item=>{
                                                let img = item.data().imagen
                                                if(imgUser){
                                                    if(img.url){
                                                        //la eliminamos
                                                        storage.ref('linkcardempresarial').child(img.key).delete();
                                                    }
                                                        let name = `${imgUser.name}${new Date().getTime()}`
                                                        const uploadTask = storage.ref(`/linkcardempresarial/${name}`).put(imgUser)
                                                        uploadTask.on("state_changed", console.log, console.error, () => {
                                                            storage
                                                              .ref("linkcardempresarial")
                                                              .child(name)
                                                              .getDownloadURL()
                                                              .then((url) => {
                                                                let obj = {
                                                                    key: name,
                                                                    url: url
                                                                }
                                                                    item.ref.update({
                                                                        imagen: obj,
                                                                        apellidos: values.apellidos,
                                                                        biografia: values.biografia,
                                                                        celular: values.celular,
                                                                        ciudad: values.ciudad,
                                                                        cumpleanos: values.cumpleanos,
                                                                        cumpleanos_activo: values.cumpleanos_activo,
                                                                        direccion: values.direccion,
                                                                        direccion_activa: values.direccion_activa,
                                                                        email: values.email,
                                                                        empresa: values.empresa,
                                                                        nombre: values.nombre,
                                                                        pais: values.pais,
                                                                        puesto: values.puesto,    
                                                                    }).then(r=>{                                                                    
                                                                        setSubmiting(false)
                                                                        toast.success("Acción exitosa", {autoClose: 3000})
                                                                    })                                                                
                                                              });
                                                        });
                                                    
                                                }else{
                                                    item.ref.update({
                                                        apellidos: values.apellidos,
                                                        biografia: values.biografia,
                                                        celular: values.celular,
                                                        ciudad: values.ciudad,
                                                        cumpleanos: values.cumpleanos,
                                                        cumpleanos_activo: values.cumpleanos_activo,
                                                        direccion: values.direccion,
                                                        direccion_activa: values.direccion_activa,
                                                        email: values.email,
                                                        empresa: values.empresa,
                                                        nombre: values.nombre,
                                                        pais: values.pais,
                                                        puesto: values.puesto,    
                                                    }).then(r=>{                                                                    
                                                        setSubmiting(false)
                                                        toast.success("Acción exitosa", {autoClose: 3000})
                                                    })       
                                                }
                                            })                                         
                                        })
                                        .catch(error=>{
                                            //console.log(error)
                                        })

                                    }else{
                                        const tarjetaRef = firebaseDB.collection("lke_tarjeta").doc(tarjeta)
                                        tarjetaRef.get()
                                        .then(response=>{
                                            //console.log('response')
                                            //console.log(response)   
                                            //console.log(response.data()) 
                                            tarjetaRef.update({
                                                disponible: false,
                                                fecha_activacion: new Date()
                                            })  

                                            if(imgUser){
                                                let name = `${imgUser.name}${new Date().getTime()}`
                                                const uploadTask = storage.ref(`/linkcardempresarial/${name}`).put(imgUser)
                                                uploadTask.on("state_changed", console.log, console.error, () => {
                                                    storage
                                                      .ref("linkcardempresarial")
                                                      .child(name)
                                                      .getDownloadURL()
                                                      .then((url) => {
                                                        let obj = {
                                                            key: name,
                                                            url: url
                                                        }
                                                            d['imagen'] = obj
                                                            firebaseDB.collection("lke_trabajador").add(d)
                                                            .then(response=>{
                                                                //console.log(response)
                                                                setSubmiting(false)
                                                                toast.success("Salvado correctamente", {autoClose: 3000})
                                                                history.push(`/empresa/tarjetas/value?tarjeta=${d.tarjeta}`)  
                                                            })
                                                            .catch(error=>{
                                                                //console.log(error)
                                                            })                                                              
                                                      });
                                                });
                                            }else{
                                                firebaseDB.collection("lke_trabajador").add(d)
                                                .then(response=>{
                                                    //console.log(response)
                                                    setSubmiting(false)
                                                    toast.success("Salvado correctamente", {autoClose: 3000})
                                                    history.push(`/empresa/tarjetas/value?tarjeta=${d.tarjeta}`)  
                                                })
                                                .catch(error=>{
                                                    //console.log(error)
                                                })  
                                            }
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
                                        </Row>
                                        <Row className="mt-5">    
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
                                            <Col xs="6" md="6">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Lugar de trabajo</Form.Label>
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
                                            <Col xs="6" md="6">
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
                                            <Col xs="6" md="6">
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
                                            <Col xs="6" md="6">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Correo electrónico</Form.Label>
                                                    <Field 
                                                        type="email"
                                                        className={`${errors.email && 'input-error'} form-control input-default`}
                                                        name="email"
                                                    />
                                                    {errors.email && <Form.Control.Feedback type="invalid" >{errors.email}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" md="12">
                                                <Form.Group className="mb-0">
                                                    <Form.Label className="label-default">Dirección</Form.Label>
                                                    <Field 
                                                        type="text"
                                                        className={`${errors.direccion && 'input-error'} form-control input-default`}
                                                        name="direccion"
                                                    />
                                                    {errors.direccion && <Form.Control.Feedback type="invalid" >{errors.direccion}</Form.Control.Feedback>}
                                                </Form.Group>
                                                <label className="mb-3">
                                                    <Field type="checkbox" name="direccion_activa" /> Mostrar en mi perfil
                                                </label>
                                            </Col>
                                            <Col xs="6" md="6">
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
                                            <Col xs="6" md="6">
                                                <Form.Group>
                                                    <Form.Label className="label-default">País</Form.Label>
                                                    <Field as="select" name="pais"  className={`${errors.pais && 'input-error'} form-control input-default`}>
                                                        <option>Seleccionar opción</option>
                                                        {
                                                            paises.length > 0 &&
                                                            paises.map((item,i)=>(
                                                                <option value={item} key={i}>{item}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors.pais && <Form.Control.Feedback type="invalid" >{errors.pais}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>                                            
                                            <Col xs="4" md="4">
                                                <Form.Group className="mb-0">
                                                    <Form.Label className="label-default">Cumpleaños</Form.Label>
                                                    <Field 
                                                        type="date"
                                                        className={`${errors.cumpleanos && 'input-error'} form-control input-default`}
                                                        name="cumpleanos"
                                                    />
                                                    {errors.cumpleanos && <Form.Control.Feedback type="invalid" >{errors.cumpleanos}</Form.Control.Feedback>}
                                                </Form.Group>
                                                <label className="mb-3">
                                                    <Field type="checkbox" name="cumpleanos_activo" /> Mostrar en mi perfil
                                                </label>
                                            </Col>
                                            <Col xs="12" md="12">
                                                <Form.Group className="mb-0">
                                                    <Form.Label className="label-default">Acerca de mi</Form.Label>
                                                    <Field 
                                                        placeholder="Al menos 50 caracteres recomendados"
                                                        as="textarea"
                                                        rows={3}
                                                        className={`${errors.biografia && 'input-error'} form-control input-default`}
                                                        name="biografia"
                                                    />
                                                    {errors.biografia && <Form.Control.Feedback type="invalid" >{errors.biografia}</Form.Control.Feedback>}
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
                        :
                        <VistaEstadisticaForm tarjetaCode={tarjetaCode} socialList={socialList} visitas={visitas}/>
                    }   
                </Col>
            </Row>
        </>
    );
}

export default TarjetaForm