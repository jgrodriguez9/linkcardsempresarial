import React from 'react';
import { Button, Col, Container, Image, Navbar, Row } from 'react-bootstrap';
import { FaBriefcase, FaBuilding, FaMapMarkedAlt } from 'react-icons/fa';
import defaultImage from '../images/default.png'
import { getIcon } from '../utils/getIcon';

export  default function PresentationMovil({item,cliente,handleClickSocial,CreateVCard}){

    const contacts = cliente.social_list.filter(x=>x.icon==="site" || x.icon==="phone" || x.icon==="mail")
    const social = cliente.social_list.filter(x=>x.icon!=="site" && x.icon!=="phone" && x.icon!=="mail")

    return(
        <>  
            <header className="mb-3">
                <Navbar bg="light" expand="lg" className="justify-content-center">
                    <a href="https://www.linkcards.mx/tienda/" target="blank" className="btn btn-info">Compra tu Linkcard</a>
                </Navbar>
            </header>

            <Container className="px-0 container-desktop container-mobile shadow-sm mb-3">
                <div className="position-relative mb-3">
                    <section className="bg-top bg-top-mobile" style={{backgroundImage: `url(${cliente.foto_principal.url})`}}></section>
                    <Image src={item.imagen.url ? item.imagen.url : defaultImage} className="img-desktop img-mobile" alt="Perfil imagen"/>
                </div>

                <Container>
                    <Row className="pt-7rem">
                        <Col xs="12" md="12" className="text-center">
                            <h5 className="font-weight-bold">{`${item.nombre} ${item.apellidos}`}</h5>
                            <p>{item.biografia}</p>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="12">
                            <h6 className="text-secondary mb-3">Información General</h6>
                            <ul className="list-unstyled">
                                <li className="mb-3"><FaBriefcase className="mb-1 mr-2" /> {item.puesto}</li>
                                <li className="mb-3"><FaBuilding className="mb-1 mr-2" /> {item.empresa}</li>
                                <li className="mb-3"><FaMapMarkedAlt className="mb-1 mr-2" /> {`${item.ciudad}, ${item.pais}`}</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="3">
                            <Button variant="info" block onClick={CreateVCard}>Agregar a contactos</Button>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="12">
                            <h6 className="text-secondary mb-3">Datos de contacto</h6>
                            <ul className="list-unstyled">
                                {
                                    contacts.filter(x=>x.description!=="").map((item,i)=>(
                                        <li key={i} className="mb-3 cursor-pointer" onClick={e=>handleClickSocial(item.icon, item.description)}>{getIcon(item.icon, "mb-1 mr-2")} {item.description}</li>
                                    ))
                                }
                            </ul>
                            <hr />
                        </Col>
                        <Col xs="12" md="12">
                            <h6 className="text-secondary mb-3">Redes Sociales</h6>
                            <ul className="list-unstyled">
                                {
                                    social.filter(x=>x.description!=="").map((item,i)=>(
                                        <li key={i} className="mb-3 cursor-pointer" onClick={e=>handleClickSocial(item.icon, item.description)}>{getIcon(item.icon, "mb-1 mr-2")} {item.description}</li>
                                    ))
                                }
                            </ul>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
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
                    </Row>
                </Container>
            </Container>
        </>
    )

}