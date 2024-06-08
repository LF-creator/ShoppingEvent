import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AboutUs } from '../components/AboutUs';

export function About() {
    return (
        <>
            <h1 className="text-dark">About</h1>
            <Row md={2} xs={1} lg={3} className='g-3'>
                <Col>
                    <AboutUs
                        who="Who?"
                        what="What?"
                        when="When?"
                        where="Where?"
                    />
                </Col>
            </Row>
        </>
    );
}

export default About;

