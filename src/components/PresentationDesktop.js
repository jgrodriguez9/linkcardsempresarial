import React from 'react';
import { Button, Col, Container, Image, Navbar, Row } from 'react-bootstrap';
import { FaBirthdayCake, FaBriefcase, FaBuilding, FaLocationArrow, FaMapMarkerAlt } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/es' 
import { getIcon } from '../utils/getIcon';
import { GrDocumentPdf } from 'react-icons/gr';
import { getNombreRS } from '../utils/getNombreRS';

export default function PresentationDesktop({item,cliente,handleClickSocial, urlFile}){
    const contacts = cliente.social_list.filter(x=>x.icon==="site" || x.icon==='phone')
    contacts.push({icon: "cel", description: `${item.celular}`, click: 0})
    contacts.push({description: item.email, icon: "mail", click: 0})
    const social = cliente.social_list.filter(x=>x.icon!=="site" && x.icon!=="phone" && x.icon!=="mail")

    //console.log(contacts)

    return(
        <>
            {/* <header className="mb-3">
                <Navbar bg="light" expand="lg" className="justify-content-center">
                <a href="https://linkcards.mx/tienda/" target="blank" className="btn btn-info">Compra tu Linkcard</a>
                </Navbar>
            </header> */}
            <Container className="px-0 container-desktop shadow-sm my-3">
                <div className="position-relative mb-3">                    
                    <Image src={cliente.foto_principal.url} fluid className="bg-img-destop"/>
                    {item.imagen.url && <Image src={item.imagen.url} className="img-desktop" alt="Perfil imagen"/>}
                </div>
                <Container>
                <Row>
                    <Col xs="12" md={{span: item.imagen.url ? 5 : 7, offset: item.imagen.url ? 2 : 0}}>
                        <h5>{`${item.nombre} ${item.apellidos}`}</h5>
                        <p>{item.biografia}</p>
                    </Col>
                    <Col xs="12" md="3">
                        <a href={urlFile ? urlFile : '#'} className="btn btn-block btn-info">Agregar a contactos</a>
                    </Col>
                </Row>
                <Row className="pt-8rem">
                    <Col xs='5' md="5">
                        <Row>
                            <Col xs="12" md="12">
                                <h6 className="text-secondary mb-3">Información General</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-3"><FaBriefcase className="mb-1 mr-2" /> {item.puesto}</li>
                                    <li className="mb-3"><FaBuilding className="mb-1 mr-2" /> {item.empresa}</li>
                                    {(item.ciudad && item.pais) && <li className="mb-3"><FaMapMarkerAlt className="mb-1 mr-2"/> {item.ciudad}{item.pais ? `, ${item.pais}`  : ''}</li> }
                                    {item.direccion_activa && <li className="mb-3">
                                        <a href={item.direccion} target="blank" className="cl-body"><FaLocationArrow className="mb-1 mr-2" /> Abrir ubicación en Mapas</a>
                                    </li>}
                                    {cliente.catalogo.url && <li className="mb-3">
                                        <a href={cliente.catalogo.url} target="blank" className="cl-body"><GrDocumentPdf className="mb-1 mr-2" /> {cliente.catalogo.name}</a>
                                    </li>}
                                    
                                </ul>
                                {cliente.fotos.length > 0 && <hr />}
                            </Col>
                            {
                                cliente.fotos.length > 0 && 
                                <Col xs="12" md="12">
                                    <h6 className="text-secondary mb-3">Galería</h6>
                                    <Row>
                                        {
                                            cliente.fotos.map((item,i)=>(
                                                <Col xs="6" md="6" key={i}>
                                                    <div className="h-200 mb-3">
                                                        <Image src={item.url} fluid className="img1"/>
                                                    </div>
                                                </Col>
                                            ))
                                        }                                    
                                    </Row>
                                </Col>
                            }                            
                        </Row>
                    </Col>
                    <Col xs="2" md="2">
                        <div className="v-line"></div>
                    </Col>
                    <Col xs='5' md="5">
                        <Row>
                            {contacts.filter(x=>x.description!=="").length > 0 && <Col xs="12" md="12">
                            <h6 className="text-secondary mb-3">Datos de contacto</h6>
                                <ul className="list-unstyled">
                                {item.cumpleanos_activo && <li className="mb-3"><FaBirthdayCake className="mb-1 mr-2" /> {moment(item.cumpleanos, "YYYY-MM-DD").locale("es").format("DD MMMM")}</li>}
                                    {
                                        contacts.filter(x=>x.description!=="").map((item,i)=>(
                                            <li key={i} className="mb-3 cursor-pointer" onClick={e=>handleClickSocial(item.icon, item.description)}>{getIcon(item.icon, "mb-1 mr-2")} {getNombreRS(item.icon)}</li>
                                        ))
                                    }
                                </ul>
                                <hr />
                            </Col>}
                            {social.filter(x=>x.description!=="").length > 0 && <Col xs="12" md="12">
                                <h6 className="text-secondary mb-3">Redes Sociales</h6>
                                <ul className="list-unstyled">
                                    {
                                        social.filter(x=>x.description!=="").map((item,i)=>(
                                            <li key={i} className="mb-3 cursor-pointer" onClick={e=>handleClickSocial(item.icon, item.description)}>{getIcon(item.icon, "mb-1 mr-2")} {getNombreRS(item.icon)}</li>
                                        ))
                                    }
                                </ul>
                            </Col>}
                        </Row>
                    </Col>
                </Row>
                </Container>
                
            </Container>
            
        </>
        
    )

}