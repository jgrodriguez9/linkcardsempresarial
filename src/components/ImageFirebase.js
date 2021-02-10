import React, { useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import portadaDefault from '../images/portadaDefault.svg'
import { FaTimes } from 'react-icons/fa';
import firebase from 'firebase/app'
import 'firebase/storage'
import { toast } from 'react-toastify';
import LoaderRequest from '../loader/LoaderRequest';



export default function ImageFirebase({firebaseDB, item, setItem}){
    //console.log(item)
    const storage = firebase.storage()
    const [isSubmiting, setSubmiting] = useState(false)
    const [enabledEdit, setEnabledEdit] = useState(false)
    const [nombreCatalogo, setNombreCatalogo] = useState("")
    const [errorNC, setErrorNC] = useState(false)

    
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        if(image.type === "image/png" || image.type === "image/jpg" || image.type === "image/svg" || image.type === "image/jpeg"){
            setSubmiting(true)
            if(item.foto_principal.key!==null){
                storage.ref('linkcardempresarial').child(item.foto_principal.key).delete();
            }
            let name = `${image.name}${new Date().getTime()}`
            firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE).limit(1).get()
            .then(response=>{
                if(!response.empty){
                    const uploadTask = storage.ref(`/linkcardempresarial/${name}`).put(image)
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
                            response.forEach(item=>{
                                item.ref.update({
                                    foto_principal: obj
                                }).then(r=>{
                                    setItem(prev => ({
                                        ...prev,
                                        foto_principal: obj
                                    }))
                                    setSubmiting(false)
                                    toast.success("Acción exitosa", {autoClose: 3000})
                                })                                
                            })                            
                            
                          });
                      });
                }else{
                    toast.info("No se encuentra el cliente. Intente más tarde por favor.", {autoClose: 5000})
                }
            })
        }else{
            toast.info("No es un archivo válido. Intente nuevamente por favor.", {autoClose: 5000})
        }        
    }

    const handleCatalogo = (e) => {  
        console.log(nombreCatalogo)      
        if(nombreCatalogo===""){
            setErrorNC(true)
        }else{
            setErrorNC(false)
            const file = e.target.files[0]
            console.log(file)
            if(file!==undefined && file.type === "application/pdf"){
                setSubmiting(true)
                if(item.catalogo.key!==null){
                    storage.ref('linkcardempresarial').child(item.catalogo.key).delete();
                }
                let name = `${file.name}${new Date().getTime()}`
                firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE).limit(1).get()
                .then(response=>{
                    if(!response.empty){
                        const uploadTask = storage.ref(`/linkcardempresarial/${name}`).put(file)
                        uploadTask.on("state_changed", console.log, console.error, () => {
                            storage
                            .ref("linkcardempresarial")
                            .child(name)
                            .getDownloadURL()
                            .then((url) => {
                                let obj = {
                                    key: name,
                                    url: url,
                                    name: nombreCatalogo
                                }
                                response.forEach(item=>{
                                    item.ref.update({
                                        catalogo: obj
                                    }).then(r=>{
                                        setItem(prev => ({
                                            ...prev,
                                            catalogo: obj
                                        }))
                                        setSubmiting(false)
                                        toast.success("Acción exitosa", {autoClose: 3000})
                                    })                                
                                })                            
                                
                            });
                        });
                    }else{
                        toast.info("No se encuentra el cliente. Intente más tarde por favor.", {autoClose: 5000})
                    }
                })
                }else{
                    toast.info("No es un archivo válido. Intente nuevamente por favor.", {autoClose: 5000})
                }   
            }     
    }

    const handleImageAsFileSecond = (e) => {
        const image = e.target.files[0]
        if(image.type === "image/png" || image.type === "image/jpg" || image.type === "image/svg" || image.type === "image/jpeg"){
            setSubmiting(true)
            let name = `${image.name}${new Date().getTime()}`
            firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE).limit(1).get()
            .then(response=>{
                if(!response.empty){
                    const uploadTask = storage.ref(`/linkcardempresarial/${name}`).put(image)
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
                            response.forEach(item=>{
                                let ar = [...item.data().fotos]
                                ar.push(obj)
                                item.ref.update({
                                    fotos: ar
                                }).then(r=>{
                                    setItem(prev => ({
                                        ...prev,
                                        fotos: ar
                                    }))
                                    setSubmiting(false)
                                    toast.success("Acción exitosa", {autoClose: 3000})
                                })
                                
                            })                            
                            
                          });
                      });
                }else{
                    toast.info("No se encuentra el cliente. Intente más tarde por favor.", {autoClose: 5000})
                }
            })
        }else{
            toast.info("No es un archivo válido. Intente nuevamente por favor.", {autoClose: 5000})
        }        
    }

    const deleteFoto = (key, i) =>{
        setSubmiting(true)
        let f = item.fotos;
        if(key!==null){
            storage.ref('linkcardempresarial').child(key).delete()
            .then(response=>{
                f.splice(i,1)
                firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE).limit(1).get()
                .then(resp=>{
                    resp.forEach(item=>{
                        item.ref.update({
                            fotos: f
                        }).then(r=>{
                            setItem(prev => ({
                                ...prev,
                                fotos: f
                            }))
                            setSubmiting(false)
                            toast.success("Acción exitosa", {autoClose: 3000})
                        })                                
                    })  
                })                
            });
        }
    }

    const eliminarCatalogo = key =>{
        setSubmiting(true)
        storage.ref('linkcardempresarial').child(key).delete()
        .then(response=>{
            firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE).limit(1).get()
            .then(resp=>{
                resp.forEach(item=>{
                    item.ref.update({
                        catalogo: {
                            key: null,
                            url: null,
                            name: null
                        }
                    }).then(r=>{
                        setItem(prev => ({
                            ...prev,
                            catalogo: {
                                key: null,
                                url: null,
                                name: null
                            }
                        }))
                        setSubmiting(false)
                        toast.success("Acción exitosa", {autoClose: 3000})
                    })                                
                })  
            })                
        });
    }
  

    return(
        <Row className="mb-4">
            {isSubmiting && LoaderRequest()}
            <Col>
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-secondary m-0">Configuración de Imágenes</h6>
                            <div>
                                {
                                    !enabledEdit ? <Button variant="info" onClick={e=>setEnabledEdit(true)}>Editar</Button> : 
                                    <Button variant="outline-info" onClick={e=>setEnabledEdit(false)}>Cancelar</Button>
                                }
                                
                            </div>
                            
                        </div>
                        <Row className="my-3">
                            <Col xs="12" lg="12">
                                <h6 className="m-0">Foto de portada</h6>
                                <small className="text-secondary d-block mb-2">Dimensiones sugeridas: 1440 x 300 px</small>
                                <Image src={item.foto_principal ? item.foto_principal.url : portadaDefault} fluid className="mh-80" />
                            </Col>
                            {enabledEdit && <Col xs="12" lg="12" className="mt-4">
                                <form>
                                    <input 
                                        // allows you to reach into your file directory and upload image to the browser
                                        type="file"
                                        onChange={handleImageAsFile}
                                    />
                                </form>
                            </Col>}
                        </Row>
                        <Row className="my-5">
                            <Col>
                                <h6 className="m-0">Todas las fotos</h6>
                                <small className="text-secondary d-block mb-2">Dimensiones sugeridas: 1000 x 1000 px</small>

                                <ul className="list-inline">
                                    {
                                        item.fotos.length === 0 ? <li className="text-info">No hay imágenes que mostrar en este momento</li> :
                                        item.fotos.map((item,i)=>(
                                            <li key={i} className="list-inline-item mr-3">
                                                <div className="wh-120 border position-relative">
                                                    <Image src={item.url} fluid className="h-100p" />
                                                    {enabledEdit &&  <Button className="pos-delete-img" variant="danger" size="sm" onClick={e=>deleteFoto(item.key,i)}><FaTimes /></Button>  }
                                                </div>                                                                                    
                                            </li>
                                        ))
                                    }
                                    
                                </ul>

                                {enabledEdit &&<div className="mt-4">
                                    <label>Agregar otra imagen</label>
                                    <form>
                                        <input 
                                            // allows you to reach into your file directory and upload image to the browser
                                            type="file"
                                            onChange={handleImageAsFileSecond}
                                        />
                                    </form>
                                </div>}
                                
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" lg="12">
                                <h6 className="m-0">Catálogo</h6>
                                {item.catalogo.key ? 
                                    <div>
                                        <label className="d-block">{item.catalogo.key}</label>
                                        {enabledEdit && <Button variant="outline-danger" size="sm" onClick={e=>eliminarCatalogo(item.catalogo.key)}>Eliminar catálogo</Button>}
                                    </div> : <label>No hay información que mostrar</label>}
                            </Col>   
                            {enabledEdit && <Col xs="12" lg="12" className="mt-4">
                                <form>
                                    <label className="d-block">Nombre</label>
                                    <input type="text" className={`${errorNC && 'input-error'} form-control form-control-sm w-auto mb-2`} value={nombreCatalogo} onChange={e=>setNombreCatalogo(e.target.value)} />
                                    <input 
                                        // allows you to reach into your file directory and upload image to the browser
                                        type="file"
                                        onChange={handleCatalogo}
                                    />
                                </form>
                            </Col>}         
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}