import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Jumbotron, Modal, Row, Table } from 'react-bootstrap';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { buildTopList } from '../utils/buildTopList';
import { groupBy } from '../utils/groupBy';
import { numberFormat } from '../utils/numberFormat';
import Pagination from 'rc-pagination';


import '../css/Pagination.css'

function TopTarjetaList({auth, firebaseDB}){
    const history = useHistory();
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [queryData, setQueryData] = useState('Cancún')
    const [ciudades, setCiudades] = useState([])
    const [trabajador, setTrabajador] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(()=>{        
        let arr = [];
        const itemsData = async () =>{
            setLoading(true)
            const trabajadorDB = firebaseDB.collection('lke_estadisticas').where('ciudad', '==', queryData);
            const trabajadorCollection = await trabajadorDB.get()
            trabajadorCollection.forEach(doc=>{
                arr.push(doc.data())
            })
            let arrGroupBy = groupBy(arr, "nombre");
            let arr1 = buildTopList(arrGroupBy);
            setItems(arr1)
            setLoading(false)
        }

        itemsData()
    },[queryData])

    useEffect(()=>{
        const ciudadData = async () =>{
            const citiesDB = firebaseDB.collection('lke_ciudad').doc(process.env.REACT_APP_CLIENTE);
            const citiesCollection = await citiesDB.get();
            //console.log(citiesCollection.data().items)
            setCiudades(citiesCollection.data().items);
        }

        ciudadData()
    },[])

    const verTrabajador = (tarjeta) =>{
        history.push(`/tarjetas/value?tarjeta=${tarjeta}`)
    }

    const seeTrabajador = (tarjeta, nombre) =>{
        //console.log(tarjeta)
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("lke_estadisticas")
            const trabajadorCollection = await trabajadorDB.where("tarjeta", '==', tarjeta).where("nombre", '==', nombre).orderBy('fecha').limitToLast(1).get();
            if(!trabajadorCollection.empty){
                trabajadorCollection.forEach(doc=>{
                    //console.log(doc)
                    //console.log(doc.data())
                    const entity = {                            
                        correo: doc.data().correo,
                        nombre: doc.data().nombre,
                        ciudad: doc.data().ciudad,        
                        empresa: doc.data().empresa,
                        puesto: doc.data().puesto,
                        cumpleanos: doc.data().cumpleanos,
                        celular: doc.data().celular,
                        tarjeta: doc.data().tarjeta,
                    }
                    setTrabajador(entity)
                    setShow(true)
                })
            }else{
                //console.log("empty")
                setShow(true)
            }
        }
        trabajadorData();
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Detalle del trabajador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    trabajador === null ?
                    <Row>
                        <Col>
                            <Jumbotron>
                                <h1>Lo sentimos!!!</h1>
                                <p>
                                    No se ha podido encontrar el trabajador.
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row> :
                    <dl className="row">
                        <dt className="col-sm-3 text-truncate">Tarjeta</dt>
                        <dd className="col-sm-9">{trabajador.tarjeta}</dd>

                        <dt className="col-sm-3">Nombre</dt>
                        <dd className="col-sm-9">{trabajador.nombre}</dd>
                    
                        <dt className="col-sm-3">Celular</dt>
                        <dd className="col-sm-9">{trabajador.celular}</dd>
                    
                        <dt className="col-sm-3">Correo electrónico</dt>
                        <dd className="col-sm-9">{trabajador.correo}</dd>
                    
                        <dt className="col-sm-3 text-truncate">Ciudad</dt>
                        <dd className="col-sm-9">{trabajador.ciudad}</dd>

                        <dt className="col-sm-3 text-truncate">Puesto</dt>
                        <dd className="col-sm-9">{trabajador.puesto}</dd>

                        <dt className="col-sm-3 text-truncate">Empresa</dt>
                        <dd className="col-sm-9">{trabajador.empresa}</dd>                        
                  </dl>
                }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Aceptar
                </Button>
                </Modal.Footer>
          </Modal>
            
            
            
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
                                                    <h6 className="cl-blue-light">Lista de tarjetas</h6>
                                                </Col>
                                                <Col xs={{offset:"3", span:"3"}} md={{offset:"3", span:"3"}}>
                                                    {
                                                        ciudades.length > 0 &&
                                                        <Form.Control as="select" size="sm" value={queryData} onChange={e=>setQueryData(e.target.value)}>
                                                            {
                                                                ciudades.map((item,i)=>(
                                                                    <option key={i} value={item}>{item}</option>
                                                                ))    
                                                            }
                                                        </Form.Control>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className="mt-5">
                                                <Col>
                                                    <Table responsive className="tableList">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Nombre</th>
                                                                <th>Lugar de trabajo</th>
                                                                <th>Puesto</th>
                                                                <th className="text-center">Tarjeta</th>
                                                                <th className="text-center">Visitas</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                items.slice(indexOfFirstPost, indexOfLastPost).map((item, i)=>(
                                                                    <tr key={i}>
                                                                        <td className="text-center" width="5%">{i+1}</td>
                                                                        <td width="35%"><span className="hover-underline" onClick={e=>seeTrabajador(item.tarjeta, item.nombre)}>{`${item.nombre}`}</span></td>
                                                                        <td width="18%">{`${item.empresa}`}</td>
                                                                        <td width="10%">{`${item.puesto}`}</td>
                                                                        <td width="12%" className="text-center">{`${item.tarjeta}`}</td>
                                                                        <td className="text-center" width="20%">{numberFormat(item.visualizaciones)}</td>                                                                        
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

export default TopTarjetaList