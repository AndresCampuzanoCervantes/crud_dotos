import React from 'react'
import ModalRegistar from './ModalRegistar';
import ModalImagen from './ModalImagen';
import ModalComprar from './ModalComprar';
import { firebase } from '../firebase'

const Formulario = () => {
  const [showModalCrear, setShowModalCrear] = React.useState(false);
  const [showModalImagen, setShowModalImagen] = React.useState(false);
  const [showModalComprar,setModalComprar] = React.useState(false);
  const [urlImagen, setUrlImagen] = React.useState("");
  const [listaFotosVenta, setListaFotosVenta] = React.useState([]);
  const [creados, setCreados] = React.useState(0);
  const [imgenComprada,setImagenComprada] = React.useState({});

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('ListaFotosVenta').get()
        const arrayData = data.docs.map(item => (
          {
            id: item.id, ...item.data()
          }
        ))
        setListaFotosVenta(arrayData)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos();
  }, [creados])

  const handleModalCrear = () => {
    setShowModalCrear(!showModalCrear);
  }
  const handleModalImage = (e, url) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setUrlImagen(url);
    setShowModalImagen(!showModalImagen);
  }

  const handleModalComprar = async (imagen) => {
    if (imagen!== undefined) {
      setImagenComprada(imagen)
    }
    setModalComprar(!showModalComprar)
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Crud de Fotos</h1>
      <ModalRegistar
        showModal={showModalCrear}
        handleModal={handleModalCrear}
        creados={creados}
        setCreados={setCreados}
      />
      <ModalImagen
        showModal={showModalImagen}
        handleModal={handleModalImage}
        Imagen={urlImagen}
      />
      <ModalComprar
      showModal={showModalComprar}
      handleModal={handleModalComprar}
      Imagen={imgenComprada}
      creados={creados}
      setCreados={setCreados} 
        />
      <button onClick={handleModalCrear} className="btn btn-primary float-end fw-bold mx-2 my-2">Registrar Imagen</button>
      <div className="row col-12 my-2 py-2">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th className="col">#</th>
              <th className="col">Nombre</th>
              <th className="col">Ubicacion</th>
              <th className="col">Autor</th>
              <th className="col">Teléfono</th>
              <th className="col">Valor</th>
              <th className="col-3 text-center">Acciones</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody>
            {
              listaFotosVenta.filter(item => !item.sold).map((item, index) =>
              (
                <tr className={(index + 1) % 2 === 0 ? 'table-active' : ''} key={item.id}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.author}</td>
                  <td>{item.phone}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-success btn-sm mx-2  fw-bold" onClick={() => { handleModalComprar(item) }}>Comprar</button>
                    <button className="btn btn-warning btn-sm mx-2  fw-bold">Editar</button>
                    <button className="btn btn-danger btn-sm mx-2  fw-bold">Eliminar</button>
                  </td>
                  <td>
                    <a href={'#' + item.name} onClick={(e) => { handleModalImage(e, item.imagen) }}>Ver</a>
                  </td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Formulario