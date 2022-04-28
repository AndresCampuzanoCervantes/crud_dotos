import React from 'react'
import { Modal,Button } from 'react-bootstrap'

const ModalRegistar = ({showModal,handleModal}) => {
    const [imageRandom,setImageRandom] = React.useState("");
    const [name,setName] = React.useState("");
    const [location,setLocation]= React.useState("");
    const [author,setAuthor]= React.useState("");
    const [phone,setPhone]= React.useState("");
    const [price,setPrice]= React.useState("$");

    const optenerImagen = async ()=>{
        try {
            const res = await fetch("https://picsum.photos/200/200.jpg");
            await setImageRandom(res.url);
        } catch (error) {
            console.error(error);
        }
    }
    
    React.useEffect(()=>{
        optenerImagen();
    },[showModal])

    function soloNumeros(e){
        const key = e.charCode;
        if (!(key >= 48 && key <= 57)) {
            e.preventDefault();
        } 
    }

    
    function PesoFormat(number){

        const operateNum = number.replaceAll(',','')
                                    .replaceAll('$','')
                                    .split('').reverse()
        let result = [], len = operateNum.length
        for(var i = 0; i< len; i++){
            result.push(operateNum[i])
            if(((i+1) % 3 === 0) && (i !== len-1)){
                result.push(',')
            }
        }

        setPrice('$'+result.reverse().join(''))
    }


    return (
        <>
            <Modal show={showModal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <h5>Registro de Imagen</h5>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="name" className='col-12'> <h5>Nombre:</h5> </label>
                    <input id="name"
                    className='form-control mb-2'
                    type="text" 
                    placeholder='Ingrese el nombre'
                    onChange={(e) => setName(e.target.value)}
                    value={name}/>

                    <label htmlFor="location" className='col-12'> <h5>Ubicacion:</h5> </label>
                    <input id="location"
                    className='form-control mb-2'
                    type="text" 
                    placeholder='Ingrese la Ubicacion'
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}/>

                    <label htmlFor="author" className='col-12'> <h5>Autor:</h5> </label>
                    <input id="author"
                    className='form-control mb-2'
                    type="text" 
                    placeholder='Ingrese el Autor'
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}/>

                    <label htmlFor="phone" className='col-12'> <h5>Teléfono:</h5> </label>
                    <input id="phone"
                    className='form-control mb-2'
                    type="text" 
                    placeholder='Ingrese el Telefono del Autor'
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyPress={(e)=>{soloNumeros(e)}}
                    maxLength="10"
                    value={phone}/>

                    <label htmlFor="price" className='col-12'> <h5>Valor:</h5> </label>
                    <input id="price"
                    className='form-control mb-2'
                    type="text" 
                    placeholder='Ingrese el Precio de Venta $'
                    onChange={(e) => PesoFormat(e.target.value)}
                    onKeyPress={(e)=>{soloNumeros(e)}}
                    maxLength="18"
                    value={price}/>

                    <br />
                    <label htmlFor="imagen" className='col-12'> <h5>Imagen:</h5> </label>
                    <img id="imagen" src={imageRandom} alt="Imagen Random" className="mx-auto d-block"/>
                    <br />
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button>Registrar</Button>
                    <Button onClick={handleModal} className="btn-danger">Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalRegistar