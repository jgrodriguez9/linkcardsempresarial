import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, Jumbotron, ListGroup, Modal, ProgressBar, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { numberFormat } from '../utils/numberFormat';
import userDefault from '../images/userdefault.png'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory } from 'react-router-dom';
import { groupBy } from '../utils/groupBy';
import { buildListUbicacion } from '../utils/buildListUbicacion';
import { percent } from '../utils/percent';
import { classPercent } from '../utils/classPercent';
import { buildListCiudad } from '../utils/buildListCiudad';
import { buildListTop } from '../utils/buildListTop';
import logoAddT from '../images/logoAddT.svg'
import { setToMonday } from '../utils/setToMonday';
import { buildListInfoTarjeta } from '../utils/buildListInfoTarjeta';
import { buildListRedes } from '../utils/buildListRedes';
import { getTexto } from '../utils/getTexto';
import { getImage } from '../utils/getImage';

function Statistics({auth, firebaseDB}){
    const [startDate, setStartDate] = useState(setToMonday(new Date()));
    const [endDate, setEndDate] = useState(new Date());
    const history = useHistory();

    const showAddTarjetas = e =>{
        history.push("/empresa/tarjetas/value")
    }

    const [ubicacionList, setUbicacionList] = useState([])
    const [queryData, setQueryData] = useState('Todos')
    const [maxCantidad, setMaxCantidad] = useState(0)  

    const [cantidadTrajeta, setCantidadtarjeta] = useState(0)
    const [cantidadTarjetaA, setCantidadtarjetaA] = useState(0)
    const [visualizacionTotal, setVisualizacionTotal] = useState(0)
    const [loadTarjetasStats, setLoadTarjetasStats] = useState(true)

    const [tarjetasLugar, setTarjetasLugar] = useState([])
    const [loadTarjetasLugar, setLoadTarjetasLugar] = useState(true)

    const [topTarjetas, setTopTarjetas] = useState([])
    const [ciudades, setCiudades] = useState([])

    const [redesSociales, setRedesSociales] = useState([])
    
    useEffect(()=>{
        //total tarjetas
        const tarjetaData = async () =>{
            const tarjetaDBStats = firebaseDB.collection("lke_tarjeta")
                .where('cliente', '==', process.env.REACT_APP_CLIENTE)
            const tarjetasCollection = await tarjetaDBStats.get()
            if(!tarjetasCollection.empty){
                let arrTarjeta = []
                tarjetasCollection.forEach(item=>{
                    arrTarjeta.push(item.data())
                })
                setCantidadtarjeta(arrTarjeta.filter(elem=>elem.disponible===true).length)
                 //tarjetas activas
                setCantidadtarjetaA(arrTarjeta.filter(elem=>elem.disponible===false).length)
            }else{

            }
        }
        tarjetaData()

        //ciudades para las ubicaciones
        const ciudadData = async () =>{
            const citiesDB = firebaseDB.collection('lke_ciudad').doc("ciudades");
            const citiesCollection = await citiesDB.get();
            //console.log(citiesCollection.data().items)
            setCiudades(citiesCollection.data().items);
        }
        ciudadData()


        //check redes sociales con mas visitas
        const redesData = async () =>{
            const redesStats = firebaseDB.collection("lke_trabajador").where('cliente','==', process.env.REACT_APP_CLIENTE)
            const redesCollection = await redesStats.get()
            if(!redesCollection.empty){
                let arrRedes = [];
                redesCollection.forEach(item=>{
                    item.data().social_list.forEach(e=>{
                        let obj ={
                            icon: e.icon,
                            click: e.click
                        }
                        arrRedes.push(obj)                        
                    })
                })
                let arrGroupBy = groupBy(arrRedes, "icon");
                let arr = buildListRedes(arrGroupBy);
                setRedesSociales(arr.slice(0,5))
            }else{
                setRedesSociales([])
            }
        }
        redesData()
    }, [])

    useEffect(()=>{
        //console.log('ubicacion por hotel')
        startDate.setHours(0,0,0)
        endDate.setHours(23,59,59,999)

        const ubicacionData = async () =>{
            const ubicacionDB = firebaseDB.collection('lke_estadisticas');
            if(queryData==='Todos'){
                const ubicacionCollection = await ubicacionDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                             .where('fecha', '>=', startDate)
                                                             .where('fecha', '<=', endDate).get();
                if(!ubicacionCollection.empty){
                    let arrUbicacion = [];
                    ubicacionCollection.forEach(item=>{
                        arrUbicacion.push(item.data())
                    })
                    //console.log(arrUbicacion);
                    let arrGroupBy = groupBy(arrUbicacion, "empresa");
                    let arr = buildListUbicacion(arrGroupBy);
                    setUbicacionList(arr)
                    setMaxCantidad(arr[0].visualizaciones)
                }else{
                    setUbicacionList([])                
                }        
            }else{
                const ubicacionCollection = await ubicacionDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                             .where('ciudad', '==', queryData).where('fecha', '>=', startDate)
                                                             .where('fecha', '<=', endDate).get();
                if(!ubicacionCollection.empty){
                    let arrUbicacion = [];
                    ubicacionCollection.forEach(item=>{
                        arrUbicacion.push(item.data())
                    })
                    //console.log(arrUbicacion);
                    let arrGroupBy = groupBy(arrUbicacion, "empresa");
                    let arr = buildListUbicacion(arrGroupBy);
                    setUbicacionList(arr)
                    setMaxCantidad(arr[0].visualizaciones)
                }else{
                    setUbicacionList([])                
                }        
            }                
        }

        ubicacionData();

    },[endDate, queryData])


    useEffect(()=>{
        startDate.setHours(0,0,0)
        endDate.setHours(23,59,59,999)

        //listado por ubicacion de empresa
        const ubicacionData = async () =>{
            const ubicacionDB = firebaseDB.collection('lke_estadisticas');
            const ubicacionCollection = await ubicacionDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                         .where('fecha', '>=', startDate)
                                                         .where('fecha', '<=', endDate).get();
            //visualizaciones
            setVisualizacionTotal(ubicacionCollection.size)
            if(!ubicacionCollection.empty){
                let arrUbicacion = [];
                ubicacionCollection.forEach(item=>{
                    arrUbicacion.push(item.data())
                })
                let arrCiudadGroupBy = groupBy(arrUbicacion, "ciudad"); 
                let arr1 = buildListCiudad(arrCiudadGroupBy);
                setTarjetasLugar(arr1)
                //top tres tarjetas
                let arrTopGroupBy = groupBy(arrUbicacion, "nombre");
                let arr2 = buildListTop(arrTopGroupBy);
                setTopTarjetas(arr2.slice(0,5))

            }else{
                //setUbicacionList([])
                setTarjetasLugar([])
                setTopTarjetas([])
            }            
        }
        ubicacionData();

    }, [endDate])

    const handleStartDate = date =>{
        if(date===null || date===""){
            setStartDate(new Date())
        }else{
            setStartDate(date)
        }        
        if(date>endDate){
            setEndDate(date)
        }
    }
    const handleEndDate = date =>{
        if(date===null || date===""){
            setEndDate(startDate)
        }else{
            setEndDate(date)
        }
    }

    const [seeAll,  setSeeAll] = useState(false)
    const [seeCant, setSeeCant] = useState(10)
    const onClickSetDisplay = valor =>{
        if(valor){            
            setSeeCant(1000)
        }else{
            setSeeCant(10)
        }
        setSeeAll(valor)
    }

    const [trabajador, setTrabajador] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);

    const seeTrabajador = (tarjeta, nombre) =>{
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("lke_estadisticas")
            const trabajadorCollection = await trabajadorDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
                                                           .where("tarjeta", '==', tarjeta)
                                                           .where("nombre", '==', nombre)
                                                           .orderBy('fecha')
                                                           .limitToLast(1).get();
            if(!trabajadorCollection.empty){
                trabajadorCollection.forEach(doc=>{
                    //console.log(doc)
                    //console.log(doc.data())
                    const entity = {                            
                        email: doc.data().email,
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

    //const [tarjetasInfoList, setTarjetasInfoList] = useState([])
    //const [showTarjeta, setShowTarjeta] = useState(false)
    //const handleCloseTarjeta = () => setShowTarjeta(false);

    // const seeTarjetasInfo = empresa =>{
    //     console.log(empresa)

    //     startDate.setHours(0,0,0)
    //     endDate.setHours(23,59,59,999)

    //     const ubicacionData = async () =>{
    //         const ubicacionDB = firebaseDB.collection('lke_estadisticas');
    //         if(queryData==='Todos'){
    //             const ubicacionCollection = await ubicacionDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
    //                                                          .where('fecha', '>=', startDate)
    //                                                          .where('fecha', '<=', endDate)
    //                                                          .where('empresa', '==', empresa).get();
    //             if(!ubicacionCollection.empty){
    //                 let arrUbicacion = [];
    //                 ubicacionCollection.forEach(item=>{
    //                     arrUbicacion.push(item.data())
    //                 })
    //                 //console.log(arrUbicacion);
    //                 let arrGroupBy = groupBy(arrUbicacion, "empresa");
    //                 let arr = buildListInfoTarjeta(arrGroupBy);
    //                 setTarjetasInfoList(arr)
    //                 setShowTarjeta(true)
    //             }else{
    //                 setTarjetasInfoList([])   
    //                 setShowTarjeta(true)             
    //             }        
    //         }else{
    //             const ubicacionCollection = await ubicacionDB.where('cliente', '==', process.env.REACT_APP_CLIENTE)
    //                                                          .where('ciudad', '==', queryData)
    //                                                          .where('fecha', '>=', startDate)
    //                                                          .where('fecha', '<=', endDate)
    //                                                          .where('empresa', '==', empresa).get();
    //             if(!ubicacionCollection.empty){
    //                 let arrUbicacion = [];
    //                 ubicacionCollection.forEach(item=>{
    //                     arrUbicacion.push(item.data())
    //                 })
    //                 //console.log(arrUbicacion);
    //                 let arrGroupBy = groupBy(arrUbicacion, "empresa");
    //                 let arr = buildListInfoTarjeta(arrGroupBy);
    //                 setTarjetasInfoList(arr)
    //                 setShowTarjeta(true)
    //             }else{
    //                 setTarjetasInfoList([])   
    //                 setShowTarjeta(true)             
    //             }       
    //         }                
    //     }

    //     ubicacionData();

    // }

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
                        <dd className="col-sm-9">{trabajador.email}</dd>
                    
                        <dt className="col-sm-3 text-truncate">Ciudad</dt>
                        <dd className="col-sm-9">{trabajador.ciudad}</dd>

                        <dt className="col-sm-3 text-truncate">Puesto</dt>
                        <dd className="col-sm-9">{trabajador.puesto}</dd>

                        <dt className="col-sm-3 text-truncate">Lugar de trabajo</dt>
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

        {/* <Modal show={showTarjeta} onHide={handleCloseTarjeta} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Detalle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    tarjetasInfoList.length === 0 ?
                    <Row>
                        <Col>
                            <Jumbotron>
                                <h1>Lo sentimos!!!</h1>
                                <p>
                                    No hay datos que mostrar.
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row> :
                    <Row>
                        <Col className={`${tarjetasInfoList.length > 11 && 'h-400'}`}>
                            <Table responsive size="sm" hover striped>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Puesto</th>
                                        <th>Ciudad</th>
                                        <th>Tarjeta</th>
                                        <th width="5%" className="text-center">Visitas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tarjetasInfoList.map((item,i)=>(
                                            <tr key={i}>
                                                <td>{item.nombre}</td>
                                                <td>{item.puesto}</td>
                                                <td>{item.ciudad}</td>
                                                <td>{item.tarjeta}</td>
                                                <td width="5%" className="text-center">{item.used}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseTarjeta}>
                Aceptar
              </Button>
            </Modal.Footer>
        </Modal> */}

        <Row className="mt-5 align-items-center px-3">
            <Col md="7" xs="7">
                <h4>Vista general</h4>
            </Col>
            <Col md="5" xs="5">
                <Row className="align-items-center">
                    <Col xs="5">
                        <DatePicker
                            selected={startDate}
                            onChange={date => handleStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd MMM yyyy"
                            className="input-date"
                        />
                    </Col>
                    <Col xs="2"><div className="text-center">A</div></Col>
                    <Col xs="5">
                        <DatePicker
                            selected={endDate}
                            onChange={date => handleEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd MMM yyyy"
                            className="input-date"
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        
        <Row className="mt-4 px-3 align-items-center">
            <Col xs="4" md="4">
                <Card className="border-0 bg-card-1">
                    <Card.Body>
                        <div className="p-4">
                        <span className="d-block dash-title">Total de tarjetas disponibles</span>
                        <span className="d-block dash-number">{numberFormat(cantidadTrajeta)}</span>
                        </div>                        
                    </Card.Body>
                </Card>                
            </Col>
            <Col xs="4" md="4">
                <Card className="border-0">
                    <Card.Body>
                        <div className="p-4">
                        <span className="d-block dash-title">Tarjetas activadas</span>
                        <span className="d-block dash-number dash-number-1">{numberFormat(cantidadTarjetaA)}</span>
                        </div>
                    </Card.Body>
                </Card> 
            </Col>
            <Col xs="4" md="4">
                <Card className="border-0">
                    <Card.Body>
                        <div className="p-4">
                        <span className="d-block dash-title">Total de visitas</span>
                        <span className="d-block dash-number dash-number-2">{numberFormat(visualizacionTotal)}</span>
                        </div>
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
        
        <Row className="mt-4 px-3 mb-2">
            <Col xs="4" md="4">
                <Card className="border-0 bg-blue cursor-pointer" onClick={e=>showAddTarjetas()}>
                    <Card.Body>
                        <div className="flex">
                            <img src={logoAddT} alt="tarjeta add" className="img-fluid mr-2 w-10p" />
                            <span className="cl-white fw-600">Asignar tarjeta</span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        
        <Row className="mt-4 px-3 mb-2">
            <Col md="6" xs="6">                
                <Card className="border-0">
                    <Card.Body>
                    {
                        redesSociales.length === 0 ?
                        <Row className="align-items-center">
                            <Col xs="12">
                                <h6>Top 5 redes con mayor impresión</h6> 
                            </Col>
                            <Col xs="12">
                                <p className="text-muted">No hay información a mostrar</p>
                            </Col>
                        </Row>:
                        <Row className="align-items-center">
                            <Col xs="12">
                                <h6>Top 5 redes con mayor impresión</h6>
                            </Col>
                            <Col xs="12">
                                <ListGroup variant="flush">
                                    {
                                        redesSociales.map((item,i)=>(
                                            <ListGroup.Item className="px-2" key={i}>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span className="mr-4 ft-1-2rem">{i+1}</span>
                                                        <Image src={getImage(item.icon)} rounded className="mr-4"/>
                                                        <span className="ft-1-2rem">{getTexto(item.icon)}</span>
                                                    </div>
                                                    <div>
                                                        <span><small className="d-block">Total de visitas</small></span>
                                                        <span className="text-info float-right">{item.visualizaciones}</span>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    }
                    </Card.Body>
                </Card>
            </Col>
            <Col md="6" xs="6">
                <Card className="border-0">
                    <Card.Body>
                    {
                        topTarjetas.length === 0 ?
                        <Row className="align-items-center">
                            <Col xs="12">
                                <h6>Top 5 tarjetas con mayor impresión</h6> 
                            </Col>
                            <Col xs="12">
                                <p className="text-muted">No hay información a mostrar</p>
                            </Col>
                        </Row>:
                        <Row className="align-items-center">
                            <Col xs="12">
                                <h6>Top 5 tarjetas con mayor impresión</h6>
                            </Col>
                            <Col xs="12">
                                <ListGroup variant="flush">
                                    {
                                        topTarjetas.map((item,i)=>(
                                            <ListGroup.Item className="px-2" key={i}>
                                                <div className="d-flex flex-row">
                                                    <Image src={userDefault} rounded className="st-image pr-2"/>
                                                    <div>
                                                    <span className="d-block fw-600 ft-14 hover-underline" onClick={e=>seeTrabajador(item.tarjeta, item.nombre)}>{item.nombre}</span>
                                                    <span className="d-block ft-12">{item.puesto}</span>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    }
                    </Card.Body>
                </Card>
            </Col>
        </Row>        
        </>
        
    );
}

export default Statistics