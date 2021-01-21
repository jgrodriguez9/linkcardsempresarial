import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { getImage } from '../utils/getImage';
import { getTexto } from '../utils/getTexto';

export default function VistaEstadisticaForm({tarjetaCode, socialList, visitas}){

    return(
        <Card className="border-0">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="12" lg="3">
                        <span className="tr-id font-weight-bold">ID de tarjeta </span>
                    </Col>
                    <Col xs="12" lg="5">
                    <span className="tr-code">{tarjetaCode}</span>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <h5>Total de visitas al perfil</h5>
                        <span className="d-block text-info ft-3rem">{visitas}</span>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col xs="12" lg="12">
                        <h5>Visitas por red social</h5>
                    </Col>
                    <Col xs="12" lg="12">
                        <Row>
                            {
                                socialList.length === 0 ? <Col><label>No hay información que mostrar</label></Col> :
                                socialList.map((item,i)=>(
                                    <Col key={i} xs="4" lg="3" className="align-self-center">
                                        <div className="d-flex flex-column float-left">
                                            <Image src={getImage(item.icon)} alt={item.icon} fluid className="wh-5rem align-self-center" />
                                            <label className="font-weight-bold align-self-center m-0">{getTexto(item.icon)}</label>
                                            <label className="text-info font-weight-bold align-self-center mb-4">{item.click}</label>
                                        </div>                               
                                    </Col>
                                ))
                            }
                            
                            {/* <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={mail} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Correo electrónico</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">12</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={watsaap} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Whatsapp</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">12</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={site} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Página Web</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={facebook} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Facebook</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={twitter} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Twitter</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>

                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={instagram} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Instagram</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">12</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={tiktok} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">TikTok</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={pinterest} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Pinterest</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={youtube} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Youtube</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>

                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={linkedin} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">LinkedIn</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">12</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={sky} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Skype</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={telegram} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Telegram</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={soundcloud} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Soundcloud</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>

                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={flickr} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Flickr</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">12</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={tripadvisor} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Tripadvisor</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={spotify} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Spotify</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col>
                            <Col xs="4" lg="3" className="align-self-center">
                                <div className="d-flex flex-column float-left">
                                    <Image src={behance} alt="WathSaap" fluid className="wh-5rem align-self-center" />
                                    <label className="font-weight-bold align-self-center m-0">Behance</label>
                                    <label className="text-info font-weight-bold align-self-center mb-4">19</label>
                                </div>                               
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}