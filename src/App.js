import React, { Fragment, useState, useEffect }from 'react';
import Formulario from './components/formulario';
import Cita from './components/Cita';
import Footer from './components/Footer';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar operaciones cuando el state cambia
  useEffect( () =>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    };
  }, [citas] );

  //Funcion que tome las citas actuales y agregue una nueva
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ])
  }

  //Funcion que elimina una cita por su id
    const eliminarCita = id => {
      const nuevasCitas = citas.filter(citas => citas.id !== id);
      guardarCitas(nuevasCitas);
    }

    //Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay Turnos'  : 'Administra tus Turnos';



  return (
    <Fragment>
   <h1>Administrador de pacientes</h1>

    <div className='container'>
      <div className='row'>
        <div className='one-half column'>
          <Formulario 
          crearCita={crearCita}
          />

        </div>
        <div className='one-half column'>
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita 
            key={cita.id}
            cita={cita}
            eliminarCita={eliminarCita}
            />
          ))}

        </div>
      </div>
    </div>

    <div>
      <Footer/>
    </div>

   </Fragment>
  );
}

export default App;
