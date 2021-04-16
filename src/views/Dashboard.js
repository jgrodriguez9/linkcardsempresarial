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
                        <Route exact path="/empresas/minerva"><Statistics auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresas/minerva/tarjetas"><TarjetaList auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresas/minerva/tarjetas/value"><TarjetaForm auth={auth} firebaseDB={firebaseDB}/></Route>
                        <Route exact path="/empresas/minerva/media"><Media firebaseDB={firebaseDB}/></Route>
                        {/* <Route exact path="/empresas/minerva/top-tarjetas"><TopTarjetaList auth={auth} firebaseDB={firebaseDB}/></Route> */}
                    </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer /> 
        </>
    )
}

export  default Dashboard