import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type EventScheduleProps = {
    Dreamhack: string;
    Game: string;
    Eat: string;
    Drink: string;
    Party: string;
    Sleep: string;
    Repeat: string;
};

export function EventSchedule({
    Dreamhack,
    Game,
    Eat,
    Drink,
    Party,
    Sleep,
    Repeat,
}: EventScheduleProps) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    };

    const handlePurchase = () => {
        navigate('/store');
    };

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{Dreamhack}</span>
                    
                </Card.Title>
                <div className="mt-auto">
                    <Button
                        className="w-100"
                        onClick={() => setShowModal(true)}
                        variant="dark"
                        size="sm"
                    >
                        Info
                    </Button>
                    <Button
                        className="w-100 mt-2"
                        onClick={handlePurchase}
                        variant="primary"
                        size="sm"
                    >
                        Add this event
                    </Button>
                </div>
            </Card.Body>
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                    <Modal.Title>{Dreamhack}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{Game}</Modal.Body>
                <Modal.Body>{Eat}</Modal.Body>
                <Modal.Body>{Drink}</Modal.Body>
                <Modal.Body>{Party}</Modal.Body>
                <Modal.Body>{Sleep}</Modal.Body>
                <Modal.Body>{Repeat}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default EventSchedule;
