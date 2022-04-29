import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { firebase } from '../firebase'

const ModalComprar = ({ showModal, handleModal, Imagen, creados, setCreados }) => {
    const comprarFoto = async () => {
        const salveImage = {
            name: Imagen.name,
            location: Imagen.location,
            author: Imagen.author,
            phone: Imagen.phone,
            imagen: Imagen.imagen,
            sold: true
        }

        const db = firebase.firestore()
        await db.collection('ListaFotosVenta').doc(Imagen.id).update(salveImage)
        await setCreados(creados - 1);
        handleModal();
    }
    return (
        <>
            <Modal show={showModal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <h5>Comprar Imagen</h5>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="imagen" className='col-12 fw-bold my-2'>Seguro que quiere comprar la siguiente imagen?</label>
                    <img id="imagen" src={Imagen.imagen} alt="Imagen" className="mx-auto d-block" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={comprarFoto} className="btn-success btn-sm mx-2  fw-bold">Confirmar</Button>
                    <Button onClick={handleModal} className="btn-danger btn-sm mx-2  fw-bold">Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalComprar