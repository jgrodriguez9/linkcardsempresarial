import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import RedesSociales from '../components/RedesSociales';
import { ToastContainer } from 'react-toastify';
import ImageFirebase from '../components/ImageFirebase';
import SkeletonMedia from '../loader/SkeletonMedia';
import NoElement from '../components/NoElement';

export default function Media({firebaseDB}){
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)

    useEffect(()=>{
        setLoading(true) 
        firebaseDB.collection("lke_empresa").where("nombre", "==", process.env.REACT_APP_SUNAPI_CLIENTE).limit(1).get()
        .then(response=>{
            if(!response.empty){
                response.forEach(it=>{
                    setItem(it.data())
                })     
                setLoading(false) 
            }
        })
    },[])

    return(
        <>
            <ToastContainer />
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <h6 className="m-0 text-secondary">Estos cambios se  reflejarán en todos los perfiles dados de alta.</h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {
                loading ? <SkeletonMedia /> :
                item===null ? <NoElement /> :
                <>
                    <ImageFirebase firebaseDB={firebaseDB} item={item} setItem={setItem}/>
                    <RedesSociales firebaseDB={firebaseDB} item={item} setItem={setItem}/>
                </>
            }

            
        </>
    )
}