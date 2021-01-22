import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight, BsThreeDotsVertical } from "react-icons/bs";
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import firebase from 'firebase/app'
import 'firebase/storage'

import '../css/Pagination.css'
import { MdModeEdit } from 'react-icons/md';
import LoaderRequest from '../loader/LoaderRequest';
import SkeletonTarjetaList from '../loader/SkeletonTarjetaList';

function TarjetaList({auth, firebaseDB}){
    const storage = firebase.storage()
    const history = useHistory();
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState('nombre')
    const [arrTarjetas, setArrTarjetas] = useState([])
    const [isSubmiting, setSubmiting] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(()=>{       
        DataList(orderBy)
    },[orderBy])

    const DataList = (orderBy) =>{
        setLoading(true)
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('lke_trabajador').where('cliente', '==', process.env.REACT_APP_CLIENTE).orderBy(orderBy);
            const trabajadorCollection = await trabajadorDB.get()
            trabajadorCollection.forEach(doc=>{
                arr.push(doc.data())
            })
            setItems(arr)
            setLoading(false)
        }
        itemsData()
    }

    const verTrabajador = (tarjeta) =>{
        //console.log(tarjeta)
        history.push(`/empresa/tarjetas/value?tarjeta=${tarjeta}`)
    }

    const onHandleClickDelete = (tarjeta, index) =>{
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("lke_trabajador")
            const trabajadorCollection = await trabajadorDB.where('cliente', '==', process.env.REACT_APP_CLIENTE).where("tarjeta", '==', tarjeta).limit(1).get();
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

    const onHandleChangeCheck = (checked, tarjeta) =>{
        if(checked){
            let arr = [...arrTarjetas]
            const index = arr.findIndex(ele=>ele === tarjeta)
            if(index<0){
                arr.push(tarjeta)
                setArrTarjetas(arr)
            }
        }else{
            let arr = [...arrTarjetas]
            const index = arr.findIndex(ele=>ele === tarjeta)
            if(index>=0){
                arr.splice(index,1)
                setArrTarjetas(arr)
            }
        }        
    }

    const borrarVisitas = () =>{
        setSubmiting(true)
        //borramos las visitas del trabajador
        //borramos los click de las redes sociales del trabajador
        firebaseDB.collection('lke_trabajador').where('cliente', '==', process.env.REACT_APP_CLIENTE).where('tarjeta', 'in', arrTarjetas).get()
        .then(response=>{
            if(!response.empty){
                response.forEach(item=>{
                    let social = []
                    item.data().social_list.forEach(e=>{
                        let obj = {
                            click: 0,
                            icon: e.icon,
                            description: e.description
                        }
                        social.push(obj)
                    })
                    item.ref.update({
                        social_list: social,
                        visitas: 0
                    })
                    //buscamos todas las estadisticas de este trabajador y la limpiamos
                    let name = `${item.data().nombre} ${item.data().apellidos}`

                    firebaseDB.collection('lke_estadisticas').where('cliente', '==', process.env.REACT_APP_CLIENTE)
                    .where('nombre', '==', name)
                    .where('tarjeta', '==', item.data().tarjeta)
                    .get()
                    .then(r=>{
                        if(!r.empty){
                            r.forEach((rr, i)=>{
                                firebaseDB.collection('lke_estadisticas').doc(rr.id).delete();
                            })
                        }
                        setSubmiting(false)
                        DataList(orderBy)
                        setArrTarjetas([])
                    })                                                           
                    
                })
            }
        })
    }


    return(
        <>
        {
            isLoading ? <SkeletonTarjetaList />:
            <>
                {isSubmiting && LoaderRequest()}
                <Row className="mt-5 px-3">
                    <Col>
                        <div className="d-flex justify-content-between">
                            <div><h4>Tarjetas</h4></div>
                            <div><Link to="/empresa/tarjetas/value" className="btn btn-info btn-sm px-5">Asignar tarjeta</Link></div>
                        </div>
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
                                                                    <th></th>
                                                                    <th>Nombre</th>
                                                                    <th>Celular</th>
                                                                    <th>Lugar de trabajo</th>
                                                                    <th>Ubicación</th>
                                                                    <th>Visitas</th>
                                                                    <th>Tarjeta</th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    items.slice(indexOfFirstPost, indexOfLastPost).map((item, i)=>(
                                                                        <tr key={i}>
                                                                            <th width="3%"><input type="checkbox" onChange={e=>onHandleChangeCheck(e.target.checked, item.tarjeta)} /></th>
                                                                            <td width="27%">{`${item.nombre} ${item.apellidos}`}</td>
                                                                            <td width="15%">{item.celular}</td>
                                                                            <td width="15%">{item.empresa}</td>
                                                                            <td width="15%">{item.ciudad}, {item.pais}</td>
                                                                            <td width="10%">{item.visitas}</td>
                                                                            <td width="10%">{item.tarjeta}</td>
                                                                            <td width="5%">
                                                                                <MdModeEdit onClick={e=>verTrabajador(item.tarjeta)} className="cursor-pointer wh-1rem"/>
                                                                            </td>
                                                                            <td>
                                                                                <FaTrashAlt className="text-danger cursor-pointer wh-1rem" onClick={e=>onHandleClickDelete(item.tarjeta, i)} />
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
                                <Row className="mt-4 justify-content-end">
                                    <Col xs="8" md="3" className="text-right">
                                        <Button 
                                            variant="light" size="sm" className="text-danger" 
                                            onClick={e=>borrarVisitas()}
                                            disabled={arrTarjetas.length === 0 ? true : false}><FaTrashAlt className="mb-1 mr-2" /> Borrar visitas</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        }
        </>
    );
}

export default TarjetaList