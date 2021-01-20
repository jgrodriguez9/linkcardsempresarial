import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonMedia(){

    return(
        <>
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Skeleton height={200} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                     <Card>
                        <Card.Body>
                            <Skeleton height={200} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )

}