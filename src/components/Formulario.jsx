import { Alert } from 'bootstrap';
import React from 'react'
import ModalRegistar from './ModalRegistar';
import ModalImagen from './ModalImagen';

const Formulario = () => {
  const [showModalCrear,setShowModalCrear] = React.useState(false);
  const [showModalImagen,setShowModalImagen] = React.useState(false);
  const [urlImagen,setUrlImagen] = React.useState("");
  const handleModalCrear=()=>{
    setShowModalCrear(!showModalCrear);
  }
  const handleModalImage = (e,url)=>{
    if (e!==undefined) {
      e.preventDefault();
    }
    setUrlImagen(url);
    setShowModalImagen(!showModalImagen);
    
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Crud de Fotos</h1>
        <ModalRegistar
          showModal={showModalCrear}
          handleModal={handleModalCrear}
        />
        <ModalImagen
          showModal={showModalImagen}
          handleModal={handleModalImage}
          Imagen={urlImagen}
        />
      <buttom onClick={handleModalCrear} className="btn btn-primary float-end fw-bold mx-2 my-2">Registrar Imagen</buttom>
      <div className="row col-12 my-2 py-2">
        <table className="table ">
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
            <tr  className="table-active">
              <td className="fw-bold">1</td>
              <td>celestial</td>
              <td>las nubes</td>
              <td>Andres</td>
              <td>3022636326</td>
              <td>$50.000</td>
              <td>
                <buttom className="btn btn-success btn-sm mx-2  fw-bold">Comprar</buttom>
                <buttom className="btn btn-warning btn-sm mx-2  fw-bold">Editar</buttom>
                <buttom className="btn btn-danger btn-sm mx-2  fw-bold">Eliminar</buttom>
              </td>
              <td> 
                <a href='#celestial' onClick={(e)=>{handleModalImage(e,"https://i.picsum.photos/id/537/200/200.jpg?hmac=GbkhVOYPDlzuQ01RafGUFRhPmjRgExyPquO2_X4YKgo")}}>Ver</a>
              </td>
            </tr>
            <tr>
              <td className="fw-bold">2</td>
              <td>Nieve</td>
              <td>El Cielo</td>
              <td>Andres</td>
              <td>3022636326</td>
              <td>$50.000</td>
              <td>
                <buttom className="btn btn-success btn-sm mx-2  fw-bold">Comprar</buttom>
                <buttom className="btn btn-warning btn-sm mx-2  fw-bold">Editar</buttom>
                <buttom className="btn btn-danger btn-sm mx-2  fw-bold">Eliminar</buttom>
              </td>
              <td> 
                <a href='#Nieve' onClick={(e)=>{handleModalImage(e,"https://i.picsum.photos/id/1000/200/200.jpg?hmac=U6gBcO-m8lNXspqhLW17ugDZ1Z3cEcCQj07Wp9Nq7IQ")}}>Ver</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Formulario