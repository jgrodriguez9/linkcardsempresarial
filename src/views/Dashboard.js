import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Statistics from '../components/Statistics';
import firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'
import TarjetaForm from './TarjetaForm';
import TarjetaList from './TarjetaList';
import TopTarjetaList from './TopTarjetaList';
import Media from './Media';

function Dashboard(){
    const { auth } = useContext(authContext);
    const firebaseDB = firebase.firestore();
    
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
                    </Col>
                </Row>
            </Container>
            <Footer /> 
        </>
    )
}

export  default Dashboard