import Layout from "../../components/layout";
import { useEffect, useState } from 'react';
import axios from "axios";

function Grado() {
  const url = 'http://localhost:8000/api/grado/';
  const [grados, setGrados] = useState([]);
  const [gradoId, setGradoId] = useState('');
  const [gradoNombre, setGradoNombre] = useState('');
  const [gradoNivel, setGradoNivel] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [gradoSeleccionado, setGradoSeleccionado] = useState(null);

  useEffect(() => {
    fetchGrados();
  }, []);

  const fetchGrados = () => {
    axios.get(url)
      .then(res => {
        setGrados(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const agregarGrado = () => {
    axios.post(url, {
      grado_nombre: gradoNombre,
      grado_nivel: gradoNivel
    })
      .then(res => {
        setGradoNombre('');
        setGradoNivel('');
        setModalVisible(false);
        fetchGrados();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editarGrado = () => {
    axios.put(`${url}${gradoId}/`, {
      grado_nombre: gradoNombre,
      grado_nivel: gradoNivel
    })
      .then(res => {
        setGradoId('');
        setGradoNombre('');
        setGradoNivel('');
        setModalVisible(false);
        fetchGrados();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const eliminarGrado = () => {
    axios.delete(`${url}${gradoSeleccionado.grado_id}/`)
      .then(res => {
        setGradoSeleccionado(null);
        setConfirmacionVisible(false);
        fetchGrados();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const abrirModalAgregar = () => {
    setGradoId('');
    setGradoNombre('');
    setGradoNivel('');
    setModalVisible(true);
  };

  const abrirModalEditar = (grado) => {
    setGradoId(grado.grado_id);
    setGradoNombre(grado.grado_nombre);
    setGradoNivel(grado.grado_nivel);
    setModalVisible(true);
  };

  const abrirConfirmacion = (grado) => {
    setGradoSeleccionado(grado);
    setConfirmacionVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const cerrarConfirmacion = () => {
    setConfirmacionVisible(false);
    setGradoSeleccionado(null);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <h1 className="text-center mt-4">Grados</h1>
        <div className="text-center mb-3">
          <button className="btn btn-dark" onClick={abrirModalAgregar}>
            <i className="fa-solid fa-circle-plus"></i> Agregar Grado
          </button>
        </div>
        <div className="table-responsive">
        <table className="table table-bordered mx-auto" style={{ maxWidth: '800px' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Nivel</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {grados.map((grado, index) => (
                <tr key={grado.grado_id}>
                  <td>{index + 1}</td>
                  <td>{grado.grado_nombre}</td>
                  <td>{grado.grado_nivel}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => abrirModalEditar(grado)}>
                      <i className="fa-solid fa-edit"></i> Editar
                    </button>
                    <button className="btn btn-danger ms-2" onClick={() => abrirConfirmacion(grado)}>
                      <i className="fa-solid fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalVisible && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">{gradoId ? 'Editar Grado' : 'Agregar Grado'}</h5>
                  <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="gradoNombre">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gradoNombre"
                      value={gradoNombre}
                      onChange={e => setGradoNombre(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gradoNivel">Nivel:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gradoNivel"
                      value={gradoNivel}
                      onChange={e => setGradoNivel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  {gradoId ? (
                    <button type="button" className="btn btn-primary" onClick={editarGrado}>Guardar Cambios</button>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={agregarGrado}>Agregar Grado</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {confirmacionVisible && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">Confirmación de Eliminación</h5>
                  <button type="button" className="btn-close" onClick={cerrarConfirmacion}></button>
                </div>
                <div className="modal-body">
                  ¿Estás seguro de que deseas eliminar el grado <strong>{gradoSeleccionado?.grado_nombre}</strong> con nivel <strong>{gradoSeleccionado?.grado_nivel}</strong>?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarConfirmacion}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={eliminarGrado}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Grado;
