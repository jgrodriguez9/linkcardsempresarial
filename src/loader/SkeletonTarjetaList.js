import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';


export default function SkeletonTarjetaList(){

    return(
        <>
            <Row className="mt-5 px-3">
                <Col>
                    <div className="d-flex justify-content-between">
                        <div><Skeleton height={35} width={150}/></div>
                        <div><Skeleton height={35} width={150}/></div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5 px-3 mb-2">
                    <Col>
                        <Card className="border-0">
                            <Card.Body className="p-5">
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
                                                <tr>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                    <td><Skeleton count={10} height={35}/></td>
                                                </tr>
                                                                                                            
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row> 
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </>
    )
}