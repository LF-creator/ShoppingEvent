import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { EventSchedule } from '../components/EventSchedule';

export function Events() {
    return (
        <>
            <h1 className="text-dark">Events</h1>
            <Row md={2} xs={1} lg={3} className='g-3'>
                <Col>
                    <EventSchedule
                        Dreamhack="Dreamhack VIP (only VIP event)"
                        Game="Gaming Tournament"
                        Eat="Food Festival"
                        Drink="Mån-Tor: 10-22, Fre-Lör: 10-02, Sön: 10-18"
                        Party="Afterparty"
                        Sleep="Camping Zone"
                        Repeat="Every Year"
                    />
                </Col>
                <Col>
                    <EventSchedule
                        Dreamhack="Dreamhack Silver"
                        Game="Tech Innovations Showcase"
                        Eat="Tech Food Corner"
                        Drink="Mån-fre: 10-22, Lör: 10-02, Sön: 10-18"
                        Party="Tech Networking Night"
                        Sleep="Tech Lounge"
                        Repeat="Biennial"
                    />
                </Col>
                <Col>
                    <EventSchedule
                        Dreamhack="Standard Dreamhack"
                        Game="Music Concerts"
                        Eat="International Cuisine"
                        Drink="tis-tor: 10-22, sön: 10-18"
                        Party="Music Dance Night"
                        Sleep="Camping Grounds"
                        Repeat="Annual"
                    />
                </Col>
                <Col>
                    <EventSchedule
                        Dreamhack="Event upplevelse"
                        Game="Music Concerts"
                        Eat="International Cuisine"
                        Drink="Alla dagar: 10-22"
                        Party="Music Dance Night"
                        Sleep="Camping Grounds"
                        Repeat="Annual"
                    />
                </Col>
                <Col>
                    <EventSchedule
                        Dreamhack="Flak med energidryck"
                        Game="Music Concerts"
                        Eat="International Cuisine"
                        Drink="Dreamhack Bar"
                        Party="24st Flak med energidryck"
                        Sleep="Camping Grounds"
                        Repeat="Annual"
                    />
                </Col>
                <Col>
                    <EventSchedule
                        Dreamhack="All inclusive"
                        Game="Music Concerts"
                        Eat="International Cuisine"
                        Drink="Alla dagar: 10-22"
                        Party="Music Dance Night"
                        Sleep="Camping Grounds"
                        Repeat="Annual"
                    />
                </Col>
            </Row>
        </>
    );
}

export default Events;

