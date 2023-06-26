import Layout from "../components/layout";
import { useEffect, useState } from 'react';
import axios from "axios";

function Prueba() {
  const url = 'http://127.0.0.1:8000/api/movilidad/';
  const urlColegio = 'http://127.0.0.1:8000/api/colegio/';
  const urlApoderado = 'http://127.0.0.1:8000/api/apoderado/';
  const urlGrado = 'http://127.0.0.1:8000/api/grado/';
  const urlVehiculo = 'http://127.0.0.1:8000/api/vehiculo/';
  const urlAlumno = 'http://127.0.0.1:8000/api/alumno/';

  const [colegio, setColegio] = useState([]);
  const [apoderado, setApoderado] = useState([]);
  const [grado, setGrado] = useState([]);
  const [vehiculo, setVehiculo] = useState([]);
  const [alumno, setAlumno] = useState([]);
  const [movilidad, setMovilidad] = useState([]);
  const [id, setId] = useState('');
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
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("Datos a modificar");

  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log(res.data);
        setMovilidad(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(urlColegio)
      .then(res => {
        console.log(res.data);
        setColegio(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(urlApoderado)
      .then(res => {
        console.log(res.data);
        setApoderado(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(urlGrado)
      .then(res => {
        console.log(res.data);
        setGrado(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(urlVehiculo)
      .then(res => {
        console.log(res.data);
        setVehiculo(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(urlAlumno)
      .then(res => {
        console.log(res.data);
        setAlumno(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const openModal = (op, id, servicio, turno, seccion, docente, pago, colegio, apoderado, grado, vehiculo, alumno) => {
    setId(id);
    setMovilidadTipoServicio(servicio);
    setMovilidadTurno(turno);
    setMovilidadSeccion(seccion);
    setMovilidadDocente(docente);
    setMovilidadPago(pago);
    setColegioNombre(colegio);
    setApoderadoNombre(apoderado);
    setGradoNombre(grado);
    setVehiculoMarca(vehiculo);
    setAlumnoNombre(alumno);
    setOperation(op);
    setTitle("Datos a modificar");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (operation === 1) {
      const data = {
        movilidad_tipo_servicio: movilidad_tipo_servicio,
        movilidad_turno: movilidad_turno,
        movilidad_seccion: movilidad_seccion,
        movilidad_docente: movilidad_docente,
        movilidad_pago: movilidad_pago,
        colegio_nombre: colegio_nombre,
        apoderado_nombre: apoderado_nombre,
        grado_nombre: grado_nombre,
        vehiculo_marca: vehiculo_marca,
        alumno_nombre: alumno_nombre
      };
      axios.post(url, data)
        .then(res => {
          console.log(res.data);
          setMovilidad([...movilidad, res.data]);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (operation === 2) {
      const data = {
        movilidad_tipo_servicio: movilidad_tipo_servicio,
        movilidad_turno: movilidad_turno,
        movilidad_seccion: movilidad_seccion,
        movilidad_docente: movilidad_docente,
        movilidad_pago: movilidad_pago,
        colegio_nombre: colegio_nombre,
        apoderado_nombre: apoderado_nombre,
        grado_nombre: grado_nombre,
        vehiculo_marca: vehiculo_marca,
        alumno_nombre: alumno_nombre
      };
      axios.put(`${url}${id}/`, data)
        .then(res => {
          console.log(res.data);
          const updatedMovilidad = movilidad.map(item => {
            if (item.id === res.data.id) {
              return res.data;
            }
            return item;
          });
          setMovilidad(updatedMovilidad);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${url}${id}/`)
      .then(() => {
        const updatedMovilidad = movilidad.filter((item) => item.id !== id);
        setMovilidad(updatedMovilidad);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2>Movilidad</h2>
        <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalMovilidad'>
          Agregar Movilidad
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tipo de Servicio</th>
              <th>Turno</th>
              <th>Sección</th>
              <th>Docente</th>
              <th>Pago</th>
              <th>Colegio</th>
              <th>Apoderado</th>
              <th>Grado</th>
              <th>Vehículo</th>
              <th>Alumno</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movilidad.map(item => (
              <tr key={item.id}>
                <td>{item.movilidad_tipo_servicio}</td>
                <td>{item.movilidad_turno}</td>
                <td>{item.movilidad_seccion}</td>
                <td>{item.movilidad_docente}</td>
                <td>{item.movilidad_pago}</td>
                <td>{item.colegio_nombre}</td>
                <td>{item.apoderado_nombre}</td>
                <td>{item.grado_nombre}</td>
                <td>{item.vehiculo_marca}</td>
                <td>{item.alumno_nombre}</td>
                <td>
                  <button onClick={() => openModal(2, item.id, item.movilidad_tipo_servicio, item.movilidad_turno, item.movilidad_seccion, item.movilidad_docente, item.movilidad_pago, item.colegio_nombre, item.apoderado_nombre, item.grado_nombre, item.vehiculo_marca, item.alumno_nombre)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalMovilidad'>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="modalMovilidad" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="movilidad_tipo_servicio" className="form-label">Tipo de Servicio</label>
                  <input type="text" className="form-control" id="movilidad_tipo_servicio" value={movilidad_tipo_servicio} onChange={e => setMovilidadTipoServicio(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="movilidad_turno" className="form-label">Turno</label>
                  <input type="text" className="form-control" id="movilidad_turno" value={movilidad_turno} onChange={e => setMovilidadTurno(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="movilidad_seccion" className="form-label">Sección</label>
                  <input type="text" className="form-control" id="movilidad_seccion" value={movilidad_seccion} onChange={e => setMovilidadSeccion(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="movilidad_docente" className="form-label">Docente</label>
                  <input type="text" className="form-control" id="movilidad_docente" value={movilidad_docente} onChange={e => setMovilidadDocente(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="movilidad_pago" className="form-label">Pago</label>
                  <input type="text" className="form-control" id="movilidad_pago" value={movilidad_pago} onChange={e => setMovilidadPago(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="colegio_nombre" className="form-label">Colegio</label>
                  <select className="form-select" id="colegio_nombre" value={colegio_nombre} onChange={e => setColegioNombre(e.target.value)} required>
                    <option value="">Seleccionar Colegio</option>
                    {colegio.map(item => (
                      <option key={item.id} value={item.nombre}>{item.colegio_nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="apoderado_nombre" className="form-label">Apoderado</label>
                  <select className="form-select" id="apoderado_nombre" value={apoderado_nombre} onChange={e => setApoderadoNombre(e.target.value)} required>
                    <option value="">Seleccionar Apoderado</option>
                    {apoderado.map(item => (
                      <option key={item.id} value={item.nombre}>{item.apoderado_nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="grado_nombre" className="form-label">Grado</label>
                  <select className="form-select" id="grado_nombre" value={grado_nombre} onChange={e => setGradoNombre(e.target.value)} required>
                    <option value="">Seleccionar Grado</option>
                    {grado.map(item => (
                      <option key={item.id} value={item.nombre}>{item.grado_nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiculo_marca" className="form-label">Vehículo</label>
                  <select className="form-select" id="vehiculo_marca" value={vehiculo_marca} onChange={e => setVehiculoMarca(e.target.value)} required>
                    <option value="">Seleccionar Vehículo</option>
                    {vehiculo.map(item => (
                      <option key={item.id} value={item.marca}>{item.vehiculo_marca}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="alumno_nombre" className="form-label">Alumno</label>
                  <select className="form-select" id="alumno_nombre" value={alumno_nombre} onChange={e => setAlumnoNombre(e.target.value)} required>
                    <option value="">Seleccionar Alumno</option>
                    {alumno.map(item => (
                      <option key={item.id} value={item.nombre}>{item.alumno_nombre}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Prueba;
