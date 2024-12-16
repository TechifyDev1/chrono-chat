import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./ConfirmDelete.css";
interface ConfirmDeleteProps {
    show: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose} className="modal-something d-flex justify-content-center align-items-center">
            <Modal.Header closeButton style={{ backgroundColor: '#0a0f23' }}>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#0a0f23' }}>
                <p>Are you sure you want to delete this? This action can't be undone!</p>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#0a0f23' }}>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDelete;
