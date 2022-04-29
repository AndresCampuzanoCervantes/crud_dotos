import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { firebase } from '../firebase'

const ModalEstados = ({ showModal, handleModal, Imagen, creados, setCreados,modoEliminar }) => {
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
                    <h5>{!modoEliminar?'Comprar Imagen':'Elimnar Imagen'}</h5>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="imagen" className='col-12 fw-bold my-2'>{!modoEliminar?'Seguro que quiere comprar la siguiente imagen?':'Seguro que quiere Eliminar la siguiente imagen?'}</label>
                    <img id="imagen" src={Imagen.imagen} alt="Imagen" className="mx-auto d-block" />
                </Modal.Body>
                <Modal.Footer>
                    {
                        !modoEliminar?(
                            <>
                                <Button onClick={comprarFoto} className="btn-success btn-sm mx-2  fw-bold">Confirmar</Button>
                                <Button onClick={handleModal} className="btn-dark btn-sm mx-2  fw-bold">Cerrar</Button>
                            </>
                        ):(
                            <>
                                <Button onClick={EliminarFoto} className="btn-danger btn-sm mx-2  fw-bold">Eliminar</Button>
                                <Button onClick={handleModal} className="btn-dark btn-sm mx-2  fw-bold">Cerrar</Button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEstados