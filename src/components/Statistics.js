import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, Jumbotron, ListGroup, Modal, ProgressBar, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { numberFormat } from '../utils/numberFormat';
import PieChartComponent from './PieChartComponent';
import userDefault from '../images/userdefault.png'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useHistory } from 'react-router-dom';
import { groupBy } from '../utils/groupBy';
import { buildListUbicacion } from '../utils/buildListUbicacion';
import { percent } from '../utils/percent';
import { classPercent } from '../utils/classPercent';
import { buildListCiudad } from '../utils/buildListCiudad';
import { getColorCiudad } from '../utils/getColorCiudad';
import { buildListTop } from '../utils/buildListTop';
import logoAddT from '../images/logoAddT.svg'
import { setToMonday } from '../utils/setToMonday';
import { buildListInfoTarjeta } from '../utils/buildListInfoTarjeta';

function Statistics({auth, firebaseDB}){
    const [startDate, setStartDate] = useState(setToMonday(new Date()));
    const [endDate, setEndDate] = useState(new Date());
    const history = useHistory();

    const showAddTarjetas = e =>{
        history.push("/anderson/tarjetas/value")
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
    
    useEffect(()=>{
        //total tarjetas
        const tarjetaData = async () =>{
            const tarjetaDBStats = firebaseDB.collection("atarjeta").where('disponible', '==', true)
            const tarjetasCollection = await tarjetaDBStats.get()
            if(!tarjetasCollection.empty){
                let arrTarjeta = []
                tarjetasCollection.forEach(item=>{
                    arrTarjeta.push(item.data())
                })
                setCantidadtarjeta(arrTarjeta.length)
            }else{

            }
        }

        tarjetaData()
        //tarjetas activas
        const tarjetaDataA = async () =>{
            const tarjetaDBStats = firebaseDB.collection("atarjeta")
            const tarjetasCollection = await tarjetaDBStats.where("disponible", "==", false).get()
            if(!tarjetasCollection.empty){
                let arrTarjeta = []
                tarjetasCollection.forEach(item=>{
                    arrTarjeta.push(item.data())
                })
                setCantidadtarjetaA(arrTarjeta.length)
            }else{
                setCantidadtarjetaA(0)
            }
        }

        tarjetaDataA()

        //ciudades para las ubicaciones
        const ciudadData = async () =>{
            const citiesDB = firebaseDB.collection('aciudad').doc("ciudades");
            const citiesCollection = await citiesDB.get();
            //console.log(citiesCollection.data().items)
            setCiudades(citiesCollection.data().items);
        }
        ciudadData()
    }, [])

    useEffect(()=>{
        //console.log('ubicacion por hotel')
        startDate.setHours(0,0,0)
        endDate.setHours(23,59,59,999)

        const ubicacionData = async () =>{
            const ubicacionDB = firebaseDB.collection('aestadisticas');
            if(queryData==='Todos'){
                const ubicacionCollection = await ubicacionDB.where('fecha', '>=', startDate).where('fecha', '<=', endDate).get();
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
                const ubicacionCollection = await ubicacionDB.where('ciudad', '==', queryData).where('fecha', '>=', startDate).where('fecha', '<=', endDate).get();
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
            const ubicacionDB = firebaseDB.collection('aestadisticas');
            const ubicacionCollection = await ubicacionDB.where('fecha', '>=', startDate).where('fecha', '<=', endDate).get();
            //visualizaciones
            setVisualizacionTotal(ubicacionCollection.size)
            if(!ubicacionCollection.empty){
                let arrUbicacion = [];
                ubicacionCollection.forEach(item=>{
                    arrUbicacion.push(item.data())
                })
                //console.log(arrUbicacion);
                //let arrGroupBy = groupBy(arrUbicacion, "empresa");
                //let arr = buildListUbicacion(arrGroupBy);
                //setUbicacionList(arr)
                //setMaxCantidad(arr[0].visualizaciones)
                //ciudad
                let arrCiudadGroupBy = groupBy(arrUbicacion, "ciudad"); 
                let arr1 = buildListCiudad(arrCiudadGroupBy);
                setTarjetasLugar(arr1)
                //top tres tarjetas
                let arrTopGroupBy = groupBy(arrUbicacion, "nombre");
                let arr2 = buildListTop(arrTopGroupBy);
                setTopTarjetas(arr2.slice(0,10))

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
            const trabajadorDB = firebaseDB.collection("aestadisticas")
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

    const [tarjetasInfoList, setTarjetasInfoList] = useState([])
    const [showTarjeta, setShowTarjeta] = useState(false)
    const handleCloseTarjeta = () => setShowTarjeta(false);

    const seeTarjetasInfo = empresa =>{
        console.log(empresa)

        startDate.setHours(0,0,0)
        endDate.setHours(23,59,59,999)

        const ubicacionData = async () =>{
            const ubicacionDB = firebaseDB.collection('aestadisticas');
            if(queryData==='Todos'){
                const ubicacionCollection = await ubicacionDB.where('fecha', '>=', startDate).where('fecha', '<=', endDate).where('empresa', '==', empresa).get();
                if(!ubicacionCollection.empty){
                    let arrUbicacion = [];
                    ubicacionCollection.forEach(item=>{
                        arrUbicacion.push(item.data())
                    })
                    //console.log(arrUbicacion);
                    let arrGroupBy = groupBy(arrUbicacion, "empresa");
                    let arr = buildListInfoTarjeta(arrGroupBy);
                    setTarjetasInfoList(arr)
                    setShowTarjeta(true)
                }else{
                    setTarjetasInfoList([])   
                    setShowTarjeta(true)             
                }        
            }else{
                const ubicacionCollection = await ubicacionDB.where('ciudad', '==', queryData).where('fecha', '>=', startDate).where('fecha', '<=', endDate).where('empresa', '==', empresa).get();
                if(!ubicacionCollection.empty){
                    let arrUbicacion = [];
                    ubicacionCollection.forEach(item=>{
                        arrUbicacion.push(item.data())
                    })
                    //console.log(arrUbicacion);
                    let arrGroupBy = groupBy(arrUbicacion, "empresa");
                    let arr = buildListInfoTarjeta(arrGroupBy);
                    setTarjetasInfoList(arr)
                    setShowTarjeta(true)
                }else{
                    setTarjetasInfoList([])   
                    setShowTarjeta(true)             
                }       
            }                
        }

        ubicacionData();

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

        <Modal show={showTarjeta} onHide={handleCloseTarjeta} size="lg">
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
                                        <th width="5%" className="text-center">Clicks</th>
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
        </Modal>

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
                        <span className="d-block dash-title">Tarjetas Activadas</span>
                        <span className="d-block dash-number dash-number-1">{numberFormat(cantidadTarjetaA)}</span>
                        </div>
                    </Card.Body>
                </Card> 
            </Col>
            <Col xs="4" md="4">
                <Card className="border-0">
                    <Card.Body>
                        <div className="p-4">
                        <span className="d-block dash-title">Total de clicks</span>
                        <span className="d-block dash-number dash-number-2">{numberFormat(visualizacionTotal)}</span>
                        </div>
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
        
        <Row className="mt-4 px-3 mb-2">
            <Col md="4" xs="4">
                <Row>
                    <Col>
                        <Card className="border-0 bg-celeste cursor-pointer" onClick={e=>showAddTarjetas()}>
                            <Card.Body>
                                <div className="flex">
                                    <img src={logoAddT} alt="tarjeta add" className="img-fluid mr-2 w-10p" />
                                    <span className="cl-white fw-600">Asignar tarjeta</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className="mt-4">
                    <Col>
                        <Card className="border-0">
                            <Card.Body>
                                {
                                    tarjetasLugar.length === 0 ?
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h6>Ubicación de tarjetas</h6>
                                        </Col>
                                        <Col xs="12">
                                            <p className="text-muted">No hay información a mostrar</p>
                                        </Col>
                                    </Row>:
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h6>Ubicación de tarjetas</h6>
                                        </Col>
                                        <Col md="6" xs ="6">
                                            <div>
                                                <PieChartComponent auth={auth} tarjetasLugar={tarjetasLugar}/>
                                            </div>
                                        </Col>
                                        <Col md="6" xs ="6">
                                            <div>
                                                <ul className="pl-1 st-ul">
                                                    {
                                                        tarjetasLugar.map((item,i)=>(
                                                            <li key={i} className={getColorCiudad(i)}>
                                                                <span className="d-block st-1">{item.ciudad}</span>
                                                                <span className="d-block st-number">{numberFormat(item.cantidad)}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}
                <Row className="mt-4">
                    <Col>
                        <Card className="border-0">
                            <Card.Body>
                            {
                                topTarjetas.length === 0 ?
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <h6>Top 10 tarjetas con más clicks</h6> 
                                    </Col>
                                    <Col xs="12">
                                        <p className="text-muted">No hay información a mostrar</p>
                                    </Col>
                                </Row>:
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <h6>Top 10 tarjetas con más clicks</h6>
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
            </Col>
            <Col md="8" xs="8">
                <Card className="border-0">
                    {
                        ubicacionList.length === 0 ?
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <h6>Ubicación por Hotel</h6>
                                <div>
                                    {
                                        ciudades.length > 0 &&
                                        <Form.Control as="select" size="sm" value={queryData} onChange={e=>setQueryData(e.target.value)}>
                                            <option value='Todos'>Todos</option>
                                            {
                                                ciudades.map((item,i)=>(
                                                    <option key={i} value={item}>{item}</option>
                                                ))    
                                            }
                                        </Form.Control>
                                    }
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="st-title-celeste">Hotel</span>
                                <span className="st-title-celeste">Clicks</span>
                            </div>                            
                            <Row>
                                <Col className="text-center">
                                    <p className="text-muted">No hay información a mostrar</p>
                                </Col>
                            </Row>
                        </Card.Body> : 
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <h6>Ubicación por Hotel</h6>
                                <div>
                                    {
                                        ciudades.length > 0 &&
                                        <Form.Control as="select" size="sm" value={queryData} onChange={e=>setQueryData(e.target.value)}>
                                            <option value='Todos'>Todos</option>
                                            {
                                                ciudades.map((item,i)=>(
                                                    <option key={i} value={item}>{item}</option>
                                                ))    
                                            }
                                        </Form.Control>
                                    }
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-between">
                                <span className="st-title-celeste">Hotel</span>
                                <span className="st-title-celeste">Clicks</span>
                            </div>
                            {
                                ubicacionList.map((item, i)=>(
                                    <Row className={`my-4 ${i >= seeCant && 'd-none'}`} key={i}>
                                        <Col xs="2" md="2"><div className="st-title-progress">{item.cantidad}</div></Col>
                                        <Col xs="7" md="7"><div className="st-title-progress"><span className="hover-underline" onClick={e=>seeTarjetasInfo(item.empresa)}>{item.empresa}</span></div></Col>
                                        <Col xs="3" md="3"><div className="st-title-progress text-right">{item.visualizaciones}</div></Col>
                                        <Col xs="12" md="12">
                                            <ProgressBar className={`h-05 ${classPercent(percent(item.visualizaciones, maxCantidad))}`} now={percent(item.visualizaciones, maxCantidad)} />
                                        </Col>
                                    </Row>
                                ))
                            }
                            <Row>
                                {
                                    ubicacionList.length > 10 &&
                                    <Col className="text-center">
                                        <Button  type="buttom" variant="link" className="ft-14 decoration-none" onClick={e=>onClickSetDisplay(!seeAll)}>
                                            {
                                                !seeAll ? <span>Ver todo <IoIosArrowDown /></span> : <span>Ver menos <IoIosArrowUp /></span>
                                                
                                            }
                                        </Button>
                                    </Col>
                                }                                
                            </Row>
                        </Card.Body>
                    }
                </Card>
            </Col>
        </Row>        
        </>
        
    );
}

export default Statistics