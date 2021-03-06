import React, {Fragment, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) =>{
    //Crear state de Citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    const [error,actualizarError] = useState(false)

    //Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
       actualizarCita({
           ...cita,
           [e.target.name] : e.target.value
       });
    };

    //Cuando el usuario presiona agregar cita

    const submitCita = e => {
        e.preventDefault();
       
        
        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' 
        || propietario.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
           
           actualizarError(true);
            return;
        } 
        // Eliminar mensaje previo
        actualizarError(false);

        //asignar un ID
        cita.id = uuidv4();
        

        //Crear cita
        crearCita(cita);

        //Reiniciar form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }


    return (
        <Fragment>
            <h2>Generar turno</h2>

            {error ? <p className="alerta-error">
                Todos los campos son obligatorios</p>  : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                    <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Mascota"
                    onChange={actualizarState}
                    value={mascota}/>

                <label>Nombre Due??o</label>
                    <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Due??o de mascota"
                    onChange={actualizarState}
                    value={propietario}/>

                <label>Fecha</label>
                    <input
                    type="Date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                    />
                <label>Hora</label>
                    <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    />
                <label>Sintomas</label>
                    <textarea
                    
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                    ></textarea>
                    <button 
                    type="submit"
                    className="u-full-width button-primary"
                    
                    >
                        Agregar Cita
                    </button>

            </form>
        </Fragment>
        
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;