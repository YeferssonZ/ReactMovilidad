import Layout from "../../components/layout";
import { useEffect, useState } from 'react';
import axios from "axios";

function Movilidad() {
    const url = 'http://127.0.0.1:8000/api/movilidad/'
    const [movilidad, setMovilidad] = useState([]);
    const [movilidad_id, setMovilidadId] = useState('');
    const [movilidad_tipo_servicio, setMovilidadTipoServicio] = useState('');
    const [movilidad_turno, setMovilidadTurno] = useState('');
    const [movilidad_seccion, setMovilidadSeccion] = useState('');
    const [movilidad_docente, setMovilidadDocente] = useState('');
    const [movilidad_pago, setMovilidadPago] = useState('');
    const [colegio_nombre, setColegioNombre] = useState('');
    const [apoderado_nombre, setApoderadoNombre] = useState('');
    const [grado_nombre, setGradoNombre] = useState('');
    const [vehiculo_marca, setVehiculoMarca] = useState('');
    const [alumno_nombre, setAlumnoNombre] = useState('');

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setMovilidad(res.data);
            })
    }, []);








    return (
        <Layout>
            <>
                <div className="App">
                    <div className="container-fluid">
                        <div className="row mt-3">
                            <div className="col-md-4 offset-md-4" >
                                <div className="d-grid mx-auto">
                                    <button className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalMovilidad'>
                                        <i className="fa-solid fa-circle-plus"></i> Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>#</th>
                                                <th style={{ textAlign: 'center' }}>Tipo de Servicio</th>
                                                <th style={{ textAlign: 'center' }}>Turno</th>
                                                <th style={{ textAlign: 'center' }}>Seccion</th>
                                                <th style={{ textAlign: 'center' }}>Docente</th>
                                                <th style={{ textAlign: 'center' }}>Pago</th>
                                                <th style={{ textAlign: 'center' }} >Nombre del Colegio</th>
                                                <th style={{ textAlign: 'center' }}>Nombre del apoderado</th>
                                                <th style={{ textAlign: 'center' }}>Grado</th>
                                                <th style={{ textAlign: 'center' }}>Marca de Vehiculo</th>
                                                <th style={{ textAlign: 'center' }}>Nombre del alumno</th>
                                                <th style={{ textAlign: 'center' }}>Acciones</th>

                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {movilidad.map((data, i) => (
                                                <tr key={data.id}>
                                                    <td>{(i + 1)}</td>

                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_tipo_servicio}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_turno}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_seccion}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_docente}</td>
                                                    <td style={{ textAlign: 'center' }}>S/.{data.movilidad_pago}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.colegio_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.apoderado_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.grado_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.vehiculo_marca}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.alumno_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button onClick={() => openModal(
                                                            2,
                                                            data.id,
                                                            data.movilidad_tipo_servicio,
                                                            data.movilidad_turno,
                                                            data.movilidad_seccion,
                                                            data.movilidad_docente,
                                                            data.movilidad_pago,
                                                            data.colegio_nombre,
                                                            data.apoderado_nombre,
                                                            data.grado_nombre,
                                                            data.vehiculo_marca,
                                                            data.alumno_nombre

                                                        )}

                                                            className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                            <i className='fa-solid fa-edit'></i>
                                                        </button>
                                                        &nbsp;
                                                        <button onClick={() => deleteProduct(data.id, data.movilidad_tipo_servicio)} className='btn btn-danger'>
                                                            <i className='fa-solid fa-trash'></i>
                                                        </button>
                                                    </td>




                                                </tr>
                                            ))
                                            }



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="modalMovilidad" className='modal fade' aria-hidden='true'>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <label className="h5">Agega un dato</label>
                                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" id="id" ></input>
                                    <div className="input-group mb3">
                                        <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                        <input type="text" id="nombre" className="form-control" placeholder="Tipo de servicio" value={movilidad_tipo_servicio} 
                                        onChange={(e)=> setMovilidadTipoServicio(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>



                </div>
            </>
        </Layout>
    )
}

export default Movilidad;
