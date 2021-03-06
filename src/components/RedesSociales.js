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
import phone from '../images/social/phone.svg'
import soundcloud from '../images/social/soundcloud.svg'
import spotify from '../images/social/spotify.svg'
import tripadvisor from '../images/social/tripadvisor.svg'
import linkedin from '../images/social/linkedin.svg'
import { toast } from 'react-toastify';
import LoaderRequest from '../loader/LoaderRequest';
import behance from '../images/social/behance.svg'
import { getContentDB } from '../utils/getContentDB';

export default function RedesSociales({firebaseDB, item, setItem}){
    const [enabledEdit, setEnabledEdit] = useState(false)
    const [inputphone,setInputphone] = useState(getContentDB(item.social_list, 'phone'))
    // const [inputmail,setInputmail] = useState("")
    const [inputWatsaap,setInputWaatsap] = useState(getContentDB(item.social_list, 'whatsapp'))
    const [inputPW,setInputPW] = useState(getContentDB(item.social_list, 'site'))
    const [inputFacebook,setInputFacebook] = useState(getContentDB(item.social_list, 'facebook'))
    const [inputtwitter,setInputtwitter] = useState(getContentDB(item.social_list, 'twitter'))
    const [inputinstagram,setInputinstagram] = useState(getContentDB(item.social_list, 'instagram'))
    const [inputiktok,setInputiktok] = useState(getContentDB(item.social_list, 'tiktok'))
    const [inputpinterest,setInputpinterest] = useState(getContentDB(item.social_list, 'pinterest'))
    const [inputyoutube,setInputyoutube] = useState(getContentDB(item.social_list, 'youtube'))
    const [inputtelegram,setInputtelegram] = useState(getContentDB(item.social_list, 'telegram'))
    const [inputsky,setInputsky] = useState(getContentDB(item.social_list, 'skype'))
    const [inputflickr,setInputflickr] = useState(getContentDB(item.social_list, 'flickr'))
    const [inputsoundcloud,setInputsoundcloud] = useState(getContentDB(item.social_list, 'soundcloud'))
    const [inputspotify,setInputspotify] = useState(getContentDB(item.social_list, 'spotify'))
    const [inputtripadvisor,setInputtripadvisor] = useState(getContentDB(item.social_list, 'tripadvisor'))
    const [inputlinkedin,setInputlinkedin] = useState(getContentDB(item.social_list, 'linkedin'))
    const [inputbehance,setInputbehance] = useState(getContentDB(item.social_list, 'behance'))
    const [isSubmiting, setSubmiting] = useState(false);

    const salvar = e =>{
        setSubmiting(true)
        let ar = ["phone", "site", "whatsapp", "facebook", "twitter","instagram","tiktok","pinterest",
                 "youtube","telegram","skype","flickr","soundcloud","spotify","tripadvisor","linkedin", "behance"]
        

        let fRefSocial = firebaseDB.collection("lke_empresa").doc(process.env.REACT_APP_CLIENTE)
        fRefSocial.get().then(response=>{
            // console.log(response)
            // console.log(response.empty)
            let social_list = []
            if(response.exists){
                social_list = response.data().social_list
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
                fRefSocial.update({
                    social_list: social_list
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
            // case "mail":
            //         return inputmail;
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
                                            <h5 className="mt-0 mb-1">Teléfono de oficina</h5>
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
                                                    disabled={!enabledEdit} 
                                                    type="text" 
                                                    value={inputphone} 
                                                    onChange={e=>setInputphone(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                {/*<Col xs="6" lg="4">
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
                                </Col> */}
                                <Col xs="6" lg="4">
                                    <ul className="list-unstyled my-4">
                                        <li className="media border-bottom pb-3">
                                            <Image  src={watsaap} alt="WathSaap" fluid className="mr-3"/>
                                            <div className="media-body">
                                            <h5 className="mt-0 mb-1">Whatsapp</h5>
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
                                                disabled={!enabledEdit} 
                                                type="text" 
                                                placeholder="+52 998 659 6545"
                                                value={inputWatsaap} 
                                                onChange={e=>{setInputWaatsap(e.target.value)
                                                        // const re = /^(\+|\d)[0-9]{7,16}$/;
                                                        // console.log(re.test(e.target.value))
                                                        // if(e.target.value==='' || re.test(e.target.value)){
                                                            
                                                        // }                                                            
                                                    }
                                                }
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                            <input 
                                                className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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
                                                <input 
                                                    className="form-control form-control-sm w-100 d-inline" 
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