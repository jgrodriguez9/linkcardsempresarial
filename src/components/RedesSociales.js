import React, { useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import watsaap from '../images/social/watsaap.svg'
import site from '../images/social/site.svg'
import facebook from '../images/social/facebook.svg'
import twitter from '../images/social/twitter.svg'
import instagram from '../images/social/instagram.svg'
import tiktok from '../images/social/tiktok.svg'
import pinterest from '../images/social/pinterest.svg'
import youtube from '../images/social/youtube.svg'
import telegram from '../images/social/telegram.svg'
import sky from '../images/social/sky.svg'
import flickr from '../images/social/flickr.svg'
import soundcloud from '../images/social/soundcloud.svg'
import spotify from '../images/social/spotify.svg'
import tripadvisor from '../images/social/tripadvisor.svg'
import linkedin from '../images/social/linkedin.svg'
import { toast } from 'react-toastify';
import LoaderRequest from '../loader/LoaderRequest';
import behance from '../images/social/behance.svg'
import phone from '../images/social/phone.svg'
import mail from '../images/social/mail.svg'

export default function RedesSociales({firebaseDB}){
    const [enabledEdit, setEnabledEdit] = useState(false)
    const [inputphone,setInputphone] = useState("55 3289 9650")
    const [inputmail,setInputmail] = useState("ejemplo@empresa.com")
    const [inputWatsaap,setInputWaatsap] = useState("55 3289 9650")
    const [inputPW,setInputPW] = useState("linkcards.com")
    const [inputFacebook,setInputFacebook] = useState("linkcardsmx")
    const [inputtwitter,setInputtwitter] = useState("linkcardsmx")
    const [inputinstagram,setInputinstagram] = useState("linkcardsmx")
    const [inputiktok,setInputiktok] = useState("linkcardsmx")
    const [inputpinterest,setInputpinterest] = useState("linkcardsmx")
    const [inputyoutube,setInputyoutube] = useState("linkcardsmx")
    const [inputtelegram,setInputtelegram] = useState("linkcardsmx")
    const [inputsky,setInputsky] = useState("linkcardsmx")
    const [inputflickr,setInputflickr] = useState("linkcardsmx")
    const [inputsoundcloud,setInputsoundcloud] = useState("linkcardsmx")
    const [inputspotify,setInputspotify] = useState("linkcardsmx")
    const [inputtripadvisor,setInputtripadvisor] = useState("linkcardsmx")
    const [inputlinkedin,setInputlinkedin] = useState("linkcardsmx")
    const [inputbehance,setInputbehance] = useState("linkcardsmx")
    const [isSubmiting, setSubmiting] = useState(false);

    const salvar = e =>{
        setSubmiting(true)
        let ar = ["mail","phone","site", "whatsapp", "facebook", "twitter","instagram","tiktok","pinterest",
                 "youtube","telegram","skype","flickr","soundcloud","spotify","tripadvisor","linkedin", "behance"]
        

        let socialDB = firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_CLIENTE)
        socialDB.limit(1).get().then(response=>{
            // console.log(response)
            // console.log(response.empty)
            let social_list = []
            if(!response.empty){
                response.forEach(item=>{
                    social_list = item.data().social_list
                    ar.forEach(elem=>{
                        let index = social_list.findIndex(item => item.icon === elem)
                        if(index>=0){
                            social_list[index].description = getDescription(elem)
                        }else{
                            let obj = {
                                click: 0,
                                icon: elem,
                                description: getDescription(elem)
                            }
                            social_list.push(obj);
                        }
                    })
                    item.ref.update({
                        social_list: social_list
                    })
                })
                toast.success("Acción exitosa", {autoClose: 3000})
                setEnabledEdit(false)
            }            
            setSubmiting(false)
        })
        .catch(error=>{
            console.log(error)
            toast.error("Ocurrió un error en el servidor, Intenta más tarde", {autoClose: 5000})
            setSubmiting(false)
        })

    }

    const getDescription = elem=>{
        switch(elem){
            case "site":
                return inputPW;
            case "phone":
                    return inputphone;
            case "mail":
                    return inputmail;
            case "whatsapp":
                return inputWatsaap;
            case "facebook":
                return inputFacebook;
            case "twitter":
                return inputtwitter;
            case "instagram":
                return inputinstagram;
            case "tiktok":
                return inputiktok;
            case "pinterest":
                return inputpinterest;
            case "youtube":
                return inputyoutube;
            case "telegram":
                return inputtelegram;
            case "skype":
                return inputsky;
            case "flickr":
                return inputflickr;
            case "soundcloud":
                return inputsoundcloud;
            case "spotify":
                return inputspotify;
            case "tripadvisor":
                return inputtripadvisor;
            case "linkedin":
                return inputlinkedin;
            case "behance":
                return inputbehance;
            default: 
                return "";
        }
    }

    return (
        <Row className="mb-4">
            {  isSubmiting && LoaderRequest() }
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="text-secondary m-0">Configuración de Redes Sociales</h6>
                                <div>
                                    {
                                        !enabledEdit ? <Button variant="info" onClick={e=>setEnabledEdit(true)}>Editar</Button> :
                                        <div>
                                            <Button variant="outline-info mr-2" onClick={e=>setEnabledEdit(false)}>Cancelar</Button>
                                            <Button variant="info" onClick={e=>salvar()}>Guardar</Button>
                                        </div>
                                    }
                                </div>
                                
                            </div>
                            <Row className="my-3">
                                <Col xs="6" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={phone} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Teléfono</h5>
                                            <strong>+52 1</strong> 
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputphone} 
                                                    onChange={e=>setInputphone(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="6" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={mail} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Correo electrónico</h5>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputmail} 
                                                    onChange={e=>setInputmail(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="6" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={watsaap} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Whatsapp</h5>
                                            <strong>+52 1</strong> 
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputWatsaap} 
                                                    onChange={e=>setInputWaatsap(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="6" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={site} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Página Web</h5>
                                            <strong>https://www.</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputPW} 
                                                    onChange={e=>setInputPW(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={facebook} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Facebook</h5>
                                            <strong>www.facebook.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputFacebook} 
                                                    onChange={e=>setInputFacebook(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={twitter} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Twitter</h5>
                                            <strong>www.twitter.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputtwitter} 
                                                    onChange={e=>setInputtwitter(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={instagram} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Instagram</h5>
                                            <strong>www.instagram.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputinstagram} 
                                                    onChange={e=>setInputinstagram(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={tiktok} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">TikTok</h5>
                                            <strong>www.tiktok.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputiktok} 
                                                    onChange={e=>setInputiktok(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={pinterest} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Pinterest</h5>
                                            <strong>www.pinterest.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputpinterest} 
                                                    onChange={e=>setInputpinterest(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={youtube} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Youtube</h5>
                                            <strong>www.youtube.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputyoutube} 
                                                    onChange={e=>setInputyoutube(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={linkedin} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">LinkedIn</h5>
                                            <strong>www.linkedin.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputlinkedin} 
                                                    onChange={e=>setInputlinkedin(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={telegram} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Telegram</h5>
                                            <strong>www.telegram.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputtelegram} 
                                                    onChange={e=>setInputtelegram(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={sky} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Skype</h5>
                                            <strong>www.skype.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputsky} 
                                                    onChange={e=>setInputsky(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={flickr} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Flickr</h5>
                                            <strong>www.flickr.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputflickr} 
                                                    onChange={e=>setInputflickr(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={soundcloud} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">SoundCloud</h5>
                                            <strong>www.soundcloud.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputsoundcloud} 
                                                    onChange={e=>setInputsoundcloud(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={spotify} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Spotify</h5>
                                            <strong>www.spotify.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputspotify} 
                                                    onChange={e=>setInputspotify(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={tripadvisor} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Tripadvisor</h5>
                                            <strong>www.tripadvisor.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputtripadvisor} 
                                                    onChange={e=>setInputtripadvisor(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs="4" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={behance} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Behance</h5>
                                            <strong>www.behance.com/</strong>
                                                <input 
                                                    className="form-control form-control-sm w-auto d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputbehance} 
                                                    onChange={e=>setInputbehance(e.target.value)}
                                                />
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