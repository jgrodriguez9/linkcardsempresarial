import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Statistics from '../components/Statistics';
import firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'
import TarjetaForm from './TarjetaForm';
import TarjetaList from './TarjetaList';
import imgAnderson from '../images/bgAnderson.png';
import promoLinkCard from '../images/promoLinkCard.svg';
import TopTarjetaList from './TopTarjetaList';

function Dashboard(){
    const { setAuthData, auth } = useContext(authContext);
    const fireAuth = firebase.auth();
    const firebaseDB = firebase.firestore();
    const logout=e=>{
        fireAuth.signOut();
        setAuthData(null);
    }
    
    return(
        <>
            
            <Container fluid>
                <Row>
                    <Col md="9" xs="9" className="p-0 bg-gray">
                    <TopBar />

                    <Switch>
                        <Route exact path="/anderson"><Statistics auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/anderson/tarjetas"><TarjetaList auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/anderson/tarjetas/value"><TarjetaForm auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/anderson/top-tarjetas"><TopTarjetaList auth={auth} firebaseDB={firebaseDB}/></Route>
                    </Switch>

                    <Row>
                        <Col>
                        </Col>
                    </Row>

                    </Col>
                    <Col md="3" xs="3" className="p-0">
                        <div className="bg-white hv-100 p-5">
                            <Row>
                                <Col md="12" xs="12">
                                    <span>Hola</span>
                                    <h5>{auth.data.email}</h5>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col>
                                    <Image src={imgAnderson} alt="Anderson Logo" fluid/>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col className="text-center">
                                    <Button variant="outline-secondary" size="sm" onClick={e=>logout()}>CERRAR  SESIÓN</Button>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col>
                                    <Image src={promoLinkCard} alt="Promoción LinkCard" fluid/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>






            <Footer /> 
        </>
        // <div>
            
        //     {/* <SideBar /> */}
        //     <div id="content-wrapper" className="d-flex flex-column">
        //         <div id="content">
                    
        //             <Switch>
        //                 <Route exact path="/">
        //                     {/* <Statistics auth={auth}/> */}
        //                 </Route>
        //                 <Route path="/tarjetas"><Tarjetas /></Route>
        //                 {/*<Route path="/search"><Search /></Route>
        //                 <Route path="/statics/leads/:type"><GroupsLeads /></Route>
        //                 {(IsAdmin(auth.data.role) || IsOperator(auth.data.role)) && <Route path="/leads"><Leads /></Route>}
        //                 {(IsAdmin(auth.data.role) || IsOperator(auth.data.role)) && <Route path="/buyers"><Buyers /></Route>}
        //                 {IsAdmin(auth.data.role) && <Route path="/users"><Users /></Route>}
        //                 {IsAdmin(auth.data.role) && <Route path="/states"><States /></Route>}
        //                 {(IsAdmin(auth.data.role) || IsJV(auth.data.role)) && <Route path="/jv"><JV /></Route>}
        //                 {IsAdmin(auth.data.role) && <Route path="/campaign"><Campaign /></Route>}
        //                 <Route path="/notes"><Notes /></Route> */}
                        
        //             </Switch>
        //         </div>  
        //         <Footer />              
        //     </div>
        // </div>
    )
}

export  default Dashboard