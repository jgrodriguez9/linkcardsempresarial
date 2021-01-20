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
import Media from './Media';

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
            <TopBar />
            <Container fluid>
                <Row>
                    <Col className="bg-gray">
                    <Switch>
                        <Route exact path="/empresa"><Statistics auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresa/tarjetas"><TarjetaList auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresa/tarjetas/value"><TarjetaForm auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresa/media"><Media firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresa/top-tarjetas"><TopTarjetaList auth={auth} firebaseDB={firebaseDB}/></Route>
                    </Switch>

                    <Row>
                        <Col>
                        </Col>
                    </Row>

                    </Col>
                </Row>
            </Container>
            <Footer /> 
        </>
    )
}

export  default Dashboard