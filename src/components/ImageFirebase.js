import React, { useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import portadaDefault from '../images/portadaDefault.svg'
import portada from '../images/portada1.svg'
import { FaPlusCircle } from 'react-icons/fa';
import firebase from 'firebase/app'
import 'firebase/storage'
import { toast } from 'react-toastify';
import LoaderRequest from '../loader/LoaderRequest';



export default function ImageFirebase({firebaseDB, item, setItem}){
    const storage = firebase.storage()
    const [isSubmiting, setSubmiting] = useState(false)

    
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        if(image.type === "image/png" || image.type === "image/jpg" || image.type === "image/svg" || image.type === "image/jpeg"){
            setSubmiting(true)
            if(item.foto_principal.key!==null){
                storage.ref('linkcardempresarial').child(item.foto_principal.key).delete();
            }
            let name = `${image.name}${new Date().getTime()}`
            firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_SUNAPI_CLIENTE).limit(1).get()
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
  

    return(
        <Row className="mb-4">
            {isSubmiting && LoaderRequest()}
            <Col>
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-secondary m-0">Configuración de Imágenes</h6>
                            <Button variant="info">Editar</Button>
                        </div>
                        <Row className="my-3">
                            <Col xs="12" lg="12">
                                <h6 className="m-0">Foto de portada</h6>
                                <small className="text-secondary d-block mb-2">Dimensiones sugeridas: 1440 x 300 px</small>

                                <Image src={item.foto_principal ? item.foto_principal.url : portadaDefault} fluid className="mh-80" />
                            </Col>
                            <Col xs="12" lg="12" className="mt-4">
                                <form>
                                    <input 
                                        // allows you to reach into your file directory and upload image to the browser
                                        type="file"
                                        onChange={handleImageAsFile}
                                    />
                                </form>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col>
                                <h6 className="m-0">Todas las fotos</h6>
                                <small className="text-secondary d-block mb-2">Dimensiones sugeridas: 1000 x 1000 px</small>

                                <ul className="list-inline">
                                    <li className="list-inline-item mr-3">
                                        <div className="wh-120">
                                            <Image src={portada} fluid />
                                        </div>                                            
                                    </li>
                                    <li className="list-inline-item mr-3">
                                        <div className="wh-120">
                                            <Image src={portada} fluid />
                                        </div>                                            
                                    </li>
                                    <li className="list-inline-item mr-3">
                                        <div className="wh-120">
                                            <Image src={portada} fluid />
                                        </div>                                            
                                    </li>
                                    <li className="list-inline-item mr-3">
                                        <div className="wh-120 border">
                                            <div><FaPlusCircle /></div>
                                            <div><span>Agregar más</span></div>                                               
                                        </div>                                            
                                    </li>
                                </ul>
                                
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}