import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { GrNext, GrPrevious } from "react-icons/gr";
import { Last } from 'react-bootstrap/esm/PageItem';

function TarjetaList({auth, firebaseDB}){
    const history = useHistory();
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState('nombre')
    const [lastItem, setLastItem] = useState(null)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [prevDisabled, setPrevDisabled] = useState(false)

    useEffect(()=>{
        
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('atrabajador').orderBy(orderBy);
            const trabajadorCollection = await trabajadorDB.limit(10).get()
            setLastItem(trabajadorCollection.docs[trabajadorCollection.docs.length-1])
            //console.log(trabajadorCollection.docs)
            trabajadorCollection.forEach(doc=>{
                //console.log(doc.data())
                arr.push(doc.data())
            })
            setItems(arr)
            setLoading(false)
            setPrevDisabled(true)
            if(trabajadorCollection.docs.length < 10){
                setNextDisabled(true)
            }
            //setCiudades(citiesCollection.data().items);
        }

        itemsData()
    },[orderBy])

    const verTrabajador = (tarjeta) =>{
        //console.log(tarjeta)
        history.push(`/anderson/tarjetas/value?tarjeta=${tarjeta}`)
    }

    const next = e =>{
        //console.log('ok')
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('atrabajador').orderBy(orderBy).startAfter(lastItem.data()[orderBy]);
            const trabajadorCollection = await trabajadorDB.limit(10).get()
            setLastItem(trabajadorCollection.docs[trabajadorCollection.docs.length-1])
            trabajadorCollection.forEach(doc=>{
                //console.log(doc.data())
                arr.push(doc.data())
            })
            setItems(arr)
            setLoading(false)
            setPrevDisabled(false)
            if(trabajadorCollection.docs.length < 10){
                setNextDisabled(true)
            }else{
                setNextDisabled(false)
            }
        }
        itemsData()
    }
    const prev = e =>{
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('atrabajador').orderBy(orderBy).endBefore(lastItem.data()[orderBy]);
            const trabajadorCollection = await trabajadorDB.limit(10).get()
            //console.log('Num results:', trabajadorCollection.docs.length);
            if(trabajadorCollection.docs.length === 10){
                setLastItem(trabajadorCollection.docs[trabajadorCollection.docs.length-1])
                trabajadorCollection.forEach(doc=>{
                    //console.log(doc.data())
                    arr.push(doc.data())
                })
                setItems(arr)
                setLoading(false)
                setNextDisabled(false)
            }else{
                setPrevDisabled(true)
            }
        }
        itemsData()
    }

    const onHandleClickDelete = (tarjeta, index) =>{
        console.log(tarjeta)
        console.log(index)
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("atrabajador")
            const trabajadorCollection = await trabajadorDB.where("tarjeta", '==', tarjeta).limit(1).get();
            if(!trabajadorCollection.empty){
                //console.log(trabajadorCollection.doc())
                trabajadorCollection.forEach(doc=>{
                    doc.ref.delete()                                       
                })
                let arr  = [...items]
                //console.log(arr)
                arr.splice(index,1)
                //console.log(arr)
                setItems(arr)                

                //ponemos nuevamente la tarjeta disponible
                const tarjetaRef = firebaseDB.collection("atarjeta").doc(tarjeta)
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
                {/* <Col xs={{offset:"2", span:"3"}} md={{offset:"2", span:"3"}}>
                    <InputGroup className="mb-3 group-search">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder='Buscar' className="input-search" />
                    </InputGroup>
                </Col> */}
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
                                                        <option value="empresa">Empresa</option>
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
                                                                <th>Empresa</th>
                                                                <th>Ubicación</th>
                                                                <th>Puesto</th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                items.map((item, i)=>(
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
                                            <Row>
                                                <Col>
                                                    <nav>
                                                        <ul className="pagination float-right">
                                                            <li className="page-item"><Button disabled={prevDisabled} className="page-link rounded-0" variant="link" onClick={e=>prev()}><GrPrevious /></Button></li>
                                                            <li className="page-item"><Button disabled={nextDisabled} className="page-link rounded-0" variant="link" onClick={e=>next()}><GrNext /></Button></li>
                                                        </ul>
                                                    </nav>
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