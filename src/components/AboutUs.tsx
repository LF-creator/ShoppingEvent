import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

type AboutUsProps = {
    who: string;
    what: string;
    when: string;
    where: string;

};

export function AboutUs({ who, what, when, where }: AboutUsProps) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{who}</span>
                    <span className="ms-2 text-muted">{what}</span>
                    <span className="ms-2 text-muted">{when}</span>
                    <span className="ms-2 text-muted">{where}</span>
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
                </div>
            </Card.Body>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{who}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{what}</Modal.Body>
                <Modal.Body>{when}</Modal.Body>
                <Modal.Body>{where}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </Card>
    );
}

export default AboutUs;