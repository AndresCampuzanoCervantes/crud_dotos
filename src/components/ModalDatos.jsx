import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { firebase } from '../firebase'

const ModalDatos= ({ showModal, handleModal, creados, setCreados, modoEdicion, fotoEditar}) => {
    const [imageRandom, setImageRandom] = React.useState("");
    const [name, setName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [id,setId] = React.useState("");
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const optenerImagen = async () => {
            try {
                const res = await fetch("https://picsum.photos/200/200.jpg");
                await setImageRandom(res.url);
            } catch (error) {
                console.error(error);
            }
        }
        const iniciarModoEdicion=()=> {
            if (fotoEditar===undefined) {
                setError('Debe Los datos del registro seleccionado no se encuentra')
                return;
            }
            setImageRandom(fotoEditar.imagen)
            setName(fotoEditar.name)
            setLocation(fotoEditar.location)
            setAuthor(fotoEditar.author)
            setPhone(fotoEditar.phone)
            setPrice(fotoEditar.price)
            setId(fotoEditar.id)
        }
        if (showModal) {
            if (!modoEdicion) {
                optenerImagen();
            }else{
                iniciarModoEdicion();
            }
        }
    }, [showModal,modoEdicion,fotoEditar])

    const soloNumeros = (e) => {
        const key = e.charCode;
        if (!(key >= 48 && key <= 57)) {
            e.preventDefault();
        }
    }

    const PesoFormat = (number) => {
        const operateNum = number.replaceAll(',', '')
            .replaceAll('$', '')
            .split('').reverse()
        let result = [], len = operateNum.length
        for (var i = 0; i < len; i++) {
            result.push(operateNum[i])
            if (((i + 1) % 3 === 0) && (i !== len - 1)) {
                result.push(',')
            }
        }

        setPrice('$' + result.reverse().join(''))
    }

    const registrarImagen = async () => {
        if (!imageRandom.trim()) {
            setError('Error al Cargar la imagen')
            return;
        }
        if (!name.trim()) {
            setError('Debe digitar el nombre de la fotografia')
            return;
        }
        if (!location.trim()) {
            setError('Debe Ingresar el lugar donde se tomo la foto')
            return;
        }
        if (!author.trim()) {
            setError('Debe ingresar el autor de la foto')
            return;
        }
        if (!phone.trim()) {
            setError('Debe ingresar el numero de telefono del autor')
            return;
        }
        if (!price.replaceAll('$', '').trim()) {
            setError('Debe ingersar el precio de la foto')
            return;
        }
        setError('')
        try {
            const newImagen = {
                name,
                location,
                author,
                phone,
                price,
                imagen: imageRandom,
                sold: false
            }
            const db = firebase.firestore();
            await db.collection('ListaFotosVenta').add(newImagen);

            setCreados(creados + 1)
            setName('')
            setLocation('')
            setAuthor('')
            setPhone('')
            setPrice('')
            setImageRandom('')
            handleModal()
        } catch (error) {
            console.error(error)
        }
    }

    const EditarImagen = async () => {
        if (!imageRandom.trim()) {
            setError('Error al Cargar la imagen')
            return;
        }
        if (!name.trim()) {
            setError('Debe digitar el nombre de la fotografia')
            return;
        }
        if (!location.trim()) {
            setError('Debe Ingresar el lugar donde se tomo la foto')
            return;
        }
        if (!author.trim()) {
            setError('Debe ingresar el autor de la foto')
            return;
        }
        if (!phone.trim()) {
            setError('Debe ingresar el numero de telefono del autor')
            return;
        }
        if (!price.replaceAll('$', '').trim()) {
            setError('Debe ingersar el precio de la foto')
            return;
        }
        if (fotoEditar===undefined) {
            setError('Debe Los datos del registro seleccionado no se encuentra')
            return;
        }
        setError('')
        try {
            const newImagen = {
                name,
                location,
                author,
                phone,
                price,
                imagen: imageRandom,
                sold: false
            }
            const db = firebase.firestore();
            await db.collection('ListaFotosVenta').doc(id).update(newImagen);

            setCreados(creados + 1)
            setName('')
            setLocation('')
            setAuthor('')
            setPhone('')
            setPrice('')
            setImageRandom('')
            setId('')
            handleModal()
        } catch (error) {
            console.error(error)
        }
    }
    const cancelar = () => {
        setError('')
        setName('')
        setLocation('')
        setAuthor('')
        setPhone('')
        setPrice('')
        setImageRandom('')
        handleModal()
    }
    return (
        <>
            <Modal show={showModal} onHide={cancelar}>
                <Modal.Header closeButton>
                    <h5 className="title">
                        {!modoEdicion?'Registro de Imagen':'Editar Imagen'}
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    {
                        error ?
                            <div className="alert alert-danger " role="alert">
                                {error}
                            </div>
                            : null
                    }
                    <label htmlFor="name" className='col-12 fw-bold'>Nombre:</label>
                    <input id="name"
                        className='form-control mb-2'
                        type="text"
                        placeholder='Ingrese el nombre'
                        onChange={(e) => setName(e.target.value)}
                        value={name} />

                    <label htmlFor="location" className='col-12 fw-bold'>Ubicacion:</label>
                    <input id="location"
                        className='form-control mb-2'
                        type="text"
                        placeholder='Ingrese la Ubicacion'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location} />

                    <label htmlFor="author" className='col-12 fw-bold'>Autor:</label>
                    <input id="author"
                        className='form-control mb-2'
                        type="text"
                        placeholder='Ingrese el Autor'
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author} />

                    <label htmlFor="phone" className='col-12 fw-bold'>Teléfono:</label>
                    <input id="phone"
                        className='form-control mb-2'
                        type="text"
                        placeholder='Ingrese el Telefono del Autor'
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyPress={(e) => { soloNumeros(e) }}
                        maxLength="10"
                        value={phone} />

                    <label htmlFor="price" className='col-12 fw-bold'>Valor:</label>
                    <input id="price"
                        className='form-control mb-2'
                        type="text"
                        placeholder='Ingrese el Precio de Venta $'
                        onChange={(e) => PesoFormat(e.target.value)}
                        onKeyPress={(e) => { soloNumeros(e) }}
                        maxLength="18"
                        value={price} />

                    <br /> 
                    <label htmlFor="imagen" className='col-12 fw-bold'>Imagen:</label>
                    <img id="imagen" src={imageRandom} alt="Imagen Random" className="mx-auto d-block" />
                    <br />

                </Modal.Body>
                <Modal.Footer>
                    {
                        !modoEdicion?
                            (<>
                                <Button onClick={registrarImagen} className="mx-2 px-3">Registrar</Button>
                                <Button onClick={cancelar} className="btn-dark mx-2 px-3">Cancelar</Button>
                            </>)
                        : 
                            (<>
                                <Button onClick={EditarImagen} className="btn-warning px-4 mx-2">Editar</Button>
                                <Button onClick={cancelar} className="btn-dark mx-2">Cancelar</Button>
                            </>)
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDatos