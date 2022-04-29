import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { firebase } from '../firebase'

const ModalEliminar = ({ showModal, handleModal, Imagen, creados, setCreados }) => {

    const EliminarFoto = async () => {
        const db = firebase.firestore()
        await db.collection('ListaFotosVenta').doc(Imagen.id).delete()
        await setCreados(creados - 1);
        handleModal();
    }
    return (
        <>
            <Modal show={showModal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <h5>Elimnar Imagen</h5>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="imagen" className='col-12 fw-bold my-2'>Seguro que quiere Eliminar la siguiente imagen?</label>
                    <img id="imagen" src={Imagen.imagen} alt="Imagen" className="mx-auto d-block" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={EliminarFoto} className="btn-danger btn-sm mx-2  fw-bold">Eliminar</Button>
                    <Button onClick={handleModal} className="btn-dark btn-sm mx-2  fw-bold">Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEliminar