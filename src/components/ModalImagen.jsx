import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalImagen = ({ showModal, handleModal, Imagen }) => {

    return (
        <>
            <Modal show={showModal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <h5>Imagen</h5>
                </Modal.Header>
                <Modal.Body>
                    <img id="imagen" src={Imagen} alt="Imagen" className="mx-auto d-block" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModal} className="btn-danger">Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalImagen