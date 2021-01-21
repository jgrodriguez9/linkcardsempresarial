import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight, BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import firebase from 'firebase/app'
import 'firebase/storage'

import '../css/Pagination.css'

function TarjetaList({auth, firebaseDB}){
    const storage = firebase.storage()
    const history = useHistory();
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState('nombre')

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(()=>{        
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('lke_trabajador').where('cliente', '==', process.env.REACT_APP_SUNAPI_CLIENTE).orderBy(orderBy);
            const trabajadorCollection = await trabajadorDB.get()
            trabajadorCollection.forEach(doc=>{
                arr.push(doc.data())
            })
            setItems(arr)
            setLoading(false)
        }
        itemsData()
    },[orderBy])

    const verTrabajador = (tarjeta) =>{
        //console.log(tarjeta)
        history.push(`/empresa/tarjetas/value?tarjeta=${tarjeta}`)
    }

    const onHandleClickDelete = (tarjeta, index) =>{
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("lke_trabajador")
            const trabajadorCollection = await trabajadorDB.where('cliente', '==', process.env.REACT_APP_SUNAPI_CLIENTE).where("tarjeta", '==', tarjeta).limit(1).get();
            if(!trabajadorCollection.empty){
                trabajadorCollection.forEach(doc=>{
                    if(doc.data().imagen.url){
                        storage.ref('linkcardempresarial').child(doc.data().imagen.key).delete();
                    }
                    doc.ref.delete()                                       
                })
                let arr  = [...items]
                arr.splice(index,1)
                setItems(arr)
                //ponemos nuevamente la tarjeta disponible
                const tarjetaRef = firebaseDB.collection("lke_tarjeta").doc(tarjeta)
                tarjetaRef.get()
                .then(response=>{
                    //console.log('response')
                    //console.log(response)   
                    //console.log(response.data()) 
                    tarjetaRef.update({
                        disponible: true,                        
                    })                    
                })
                .catch(error=>{
                    //console.log(error)
                })
            }else{
                //console.log("empty")
            }
            //setLoading(false)
        }
        trabajadorData();
        




    }


    return(
        <>
            <Row className="mt-5 px-3">
                <Col md="7" xs="7">
                    <h4>Vista general</h4>
                </Col>
            </Row>
            <Row className="mt-5 px-3 mb-2">
                <Col>
                    <Card className="border-0">
                        <Card.Body className="p-5">
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs="6" md="6">
                                                    <h6 className="cl-blue-light text-dark">Lista de tarjetas</h6>
                                                </Col>
                                                <Col xs={{offset:"3", span:"3"}} md={{offset:"3", span:"3"}}>
                                                    <Form.Control as="select" size="sm" value={orderBy} onChange={e=>setOrderBy(e.target.value)}>
                                                        <option value="nombre">Nombre</option>
                                                        <option value="ciudad">Ubicación</option>
                                                        <option value="empresa">Lugar de trabajo</option>
                                                        <option value="puesto">Puesto</option>
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            <Row className="mt-5">
                                                <Col>
                                                    <Table responsive className="tableList">
                                                        <thead>
                                                            <tr>
                                                                <th>Nombre</th>
                                                                <th>Celular</th>
                                                                <th>Lugar de trabajo</th>
                                                                <th>Ubicación</th>
                                                                <th>Puesto</th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                items.slice(indexOfFirstPost, indexOfLastPost).map((item, i)=>(
                                                                    <tr key={i}>
                                                                        <td width="30%">{`${item.nombre} ${item.apellidos}`}</td>
                                                                        <td width="20%">{item.celular}</td>
                                                                        <td width="15%">{item.empresa}</td>
                                                                        <td width="20%">{item.ciudad}</td>
                                                                        <td width="10%">{item.puesto}</td>
                                                                        <td width="5%">
                                                                            <Button size="sm" variant="light" onClick={e=>verTrabajador(item.tarjeta)}>
                                                                                <BsThreeDotsVertical />
                                                                            </Button>
                                                                        </td>
                                                                        <td>
                                                                            <FaTrashAlt className="text-danger" onClick={e=>onHandleClickDelete(item.tarjeta, i)} />
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }                                                            
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row className="float-right">
                                                <Col>
                                                    {
                                                        items.length > 0 && 
                                                        <Pagination
                                                            onChange={page=>setCurrentPage(page)}
                                                            current={currentPage}
                                                            total={items.length}
                                                            showLessItems
                                                            showTitle
                                                            pageSize={postsPerPage}
                                                            className='pagination'
                                                            prevIcon={<BsChevronLeft />}
                                                            nextIcon={<BsChevronRight />}
                                                            jumpPrevIcon={<BiDotsHorizontalRounded />}
                                                            jumpNextIcon={<BiDotsHorizontalRounded />}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    );
}

export default TarjetaList