import React from 'react';
import { Button, Col, Container, Image, Navbar, Row } from 'react-bootstrap';
import { FaBriefcase, FaBuilding, FaEnvelope, FaFacebook, FaInstagram, FaLaptop, FaMapMarkedAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import defaultImage from '../images/default.png'
import portada from '../images/portada1.svg'
import { getIcon } from '../utils/getIcon';

export default function PresentationDesktop({item,cliente}){
    console.log(item)
    console.log(cliente)

    const contacts = cliente.social_list.filter(x=>x.icon==="site" || x.icon==="phone" || x.icon==="email")
    const social = cliente.social_list.filter(x=>x.icon!=="site" && x.icon!=="phone" && x.icon!=="email")

    console.log(contacts)

    return(
        <>
            <header className="mb-3">
                <Navbar bg="light" expand="lg" className="justify-content-center">
                    <Link to="/" className="btn btn-info">Compra tu Linkcard</Link>                    
                </Navbar>
            </header>
            <Container className="px-0 container-desktop shadow-sm mb-3">
                <div className="position-relative mb-3">
                    <section className="bg-top" style={{backgroundImage: `url(${cliente.foto_principal.url})`}}></section>
                    <Image src={defaultImage} className="img-desktop" alt="Perfil imagen"/>
                </div>
                <Container>
                <Row>
                    <Col xs="12" md={{span: "6", offset: 3}}>
                        <h5>{`${item.nombre} ${item.apellidos}`}</h5>
                        <p>{item.biografia}</p>
                    </Col>
                    <Col xs="12" md="3">
                        <Button variant="info" block>Agregar a contactos</Button>
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
                                    <li className="mb-3"><FaMapMarkedAlt className="mb-1 mr-2" /> {`${item.ciudad}, ${item.pais}`}</li>
                                </ul>
                                <hr />
                            </Col>
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
                    </Col>
                    <Col xs="2" md="2">
                        <div className="v-line"></div>
                    </Col>
                    <Col xs='5' md="5">
                        <Row>
                            <Col xs="12" md="12">
                            <h6 className="text-secondary mb-3">Datos de contacto</h6>
                                <ul className="list-unstyled">
                                    {
                                        contacts.filter(x=>x.description!=="").map((item,i)=>(
                                            <li className="mb-3 cursor-pointer">{getIcon(item.icon, "mb-1 mr-2")} {item.description}</li>
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
                                            <li key={i} className="mb-3 cursor-pointer">{getIcon(item.icon, "mb-1 mr-2")} {item.description}</li>
                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Container>
                
            </Container>
            
        </>
        
    )

}