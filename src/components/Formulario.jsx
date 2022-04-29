import React from 'react'
import ModalDatos from './ModalDatos';
import ModalImagen from './ModalImagen';
import ModalEstados from './ModalEstados';
import {firebase} from '../firebase'

const Formulario = () => {
  const [showModalDatos, setShowModalDatos] = React.useState(false);
  const [showModalImagen, setShowModalImagen] = React.useState(false);
  const [showModalEstados,setShowModalEstados] = React.useState(false);
  const [modoEliminar,setModoEliminar] = React.useState(false);
  const [modoEditar,setModoEditar] = React.useState(false);
  const [urlImagen, setUrlImagen] = React.useState("");
  const [listaFotosVenta, setListaFotosVenta] = React.useState([]);
  const [imagenEstado,setImagenEstado] = React.useState({});
  const [imegenEditar,setImegenEditar] = React.useState({});
  const [creados, setCreados] = React.useState(0);
  

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
    setShowModalDatos(!showModalDatos);
    setModoEditar(false)
    if (imegenEditar!== undefined) {
      setImegenEditar({})
    }
  }
  const handleModalImage = (e, url) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setUrlImagen(url);
    setShowModalImagen(!showModalImagen);
  }

  const handleModalEstado =  (imagen) => {
    if (imagen!== undefined) {
      setImagenEstado(imagen)
    }
    setShowModalEstados(!showModalEstados)

    if (modoEliminar) {
      setModoEliminar(!modoEliminar)
    }
  }

  const handleModalEliminar =  (imagen) => {
    setModoEliminar(!modoEliminar)
    handleModalEstado(imagen)
    
  }

  const handelModalEditar = async (imagen) => {
    setModoEditar(!modoEditar)
    setShowModalDatos(!showModalDatos);
    setImegenEditar(imagen)
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Crud de Fotos</h1>
      <ModalDatos
        showModal={showModalDatos}
        handleModal={handleModalCrear}
        creados={creados}
        setCreados={setCreados}
        modoEdicion={modoEditar}
        fotoEditar={imegenEditar}
      />
      <ModalImagen
        showModal={showModalImagen}
        handleModal={handleModalImage}
        Imagen={urlImagen}
      />
      <ModalEstados
      showModal={showModalEstados}
      handleModal={handleModalEstado}
      Imagen={imagenEstado}
      creados={creados}
      setCreados={setCreados} 
      modoEliminar={modoEliminar}
        />
      
      <button onClick={handleModalCrear} className="btn btn-primary float-end fw-bold mx-2 my-2">Registrar Imagen</button>
      <div className="row col-12 my-2 py-2">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th className="col text-center">#</th>
              <th className="col text-center">Nombre</th>
              <th className="col text-center">Ubicacion</th>
              <th className="col text-center">Autor</th>
              <th className="col text-center">Teléfono</th>
              <th className="col text-center">Valor</th>
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
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.location}</td>
                  <td className="text-center">{item.author}</td>
                  <td className="text-center">{item.phone}</td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">
                    <button className="btn btn-success btn-sm mx-2 px-2 fw-bold" onClick={() => { handleModalEstado(item) }}>Comprar</button>
                    <button className="btn btn-warning btn-sm mx-2 px-3 fw-bold" onClick={() => { handelModalEditar(item) }}>Editar</button>
                    <button className="btn btn-danger btn-sm mx-2 px-2 fw-bold" onClick={() => { handleModalEliminar(item)}}>Eliminar</button>
                  </td>
                  <td className="text-center">
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