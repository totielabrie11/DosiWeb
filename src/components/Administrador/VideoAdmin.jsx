import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoAdminAsignador from './VideoAdminAsignador';  // Importación del modal asignador
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function VideoAdmin() {
  const [videos, setVideos] = useState([]);  // Lista de videos
  const [newVideo, setNewVideo] = useState({ name: '', video: null });  // Video a cargar o editar
  const [editingVideo, setEditingVideo] = useState(null);  // Video en modo edición
  const [uploadProgress, setUploadProgress] = useState(0);  // Progreso de la subida
  const [error, setError] = useState('');  // Mensaje de error
  const [successMessage, setSuccessMessage] = useState('');  // Mensaje de éxito
  const [showAssignModal, setShowAssignModal] = useState(false);  // Controla la visualización del modal
  const [selectedVideo, setSelectedVideo] = useState(null);  // Almacena el video seleccionado para asignar

  // Obtener los videos al cargar el componente
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/videos`);  // Usar BACKEND_URL
        if (response.data && response.data.videos) {
          setVideos(response.data.videos);  // Asegúrate de que existan los datos antes de asignarlos
        }
      } catch (error) {
        console.error('Error al obtener los videos:', error);
        setError('Error al obtener los videos');
      }
    };
    fetchVideos();
  }, []);

  // Manejar cambios en los campos de entrada (nombre o archivo de video)
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      const file = files[0];
      setNewVideo({ ...newVideo, video: file });
    } else {
      setNewVideo({ ...newVideo, [name]: value });
    }
  };

  // Agregar un nuevo video con progreso
  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.video) {
      setError('Por favor selecciona un archivo de video antes de subirlo.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newVideo.name || 'video');
      formData.append('video', newVideo.video);

      setUploadProgress(0);
      setSuccessMessage('');
      setError('');

      const response = await axios.post(`${BACKEND_URL}/api/videos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      // Agregar el video subido a la lista de videos
      const updatedVideos = [...videos, response.data.video];
      setVideos(updatedVideos); // Actualiza la lista de videos
      setNewVideo({ name: '', video: null }); // Resetea el formulario
      setUploadProgress(0);
      setSuccessMessage('Video subido con éxito');
    } catch (error) {
      console.error('Error al agregar el video:', error);
      setUploadProgress(0);
      setError('Error al subir el video. Por favor intenta nuevamente.');
    }
  };

  // Marcar un video como principal
  const handleSetPrincipal = async (id) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/videos/set-principal/${id}`);  // Usar BACKEND_URL
      const updatedVideos = videos.map((video) => ({
        ...video,
        isPrincipal: video.id === id
      }));
      setVideos(updatedVideos);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error al marcar el video como principal:', error);
      setError('Error al marcar el video como principal. Intenta nuevamente.');
    }
  };

  // Editar un video existente
  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setNewVideo({ name: video.name, video: null });
  };

  // Guardar los cambios de un video en modo edición
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!newVideo.video && newVideo.name === editingVideo.name) {
      setError('No se detectaron cambios para guardar.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newVideo.name);
      if (newVideo.video) {
        formData.append('video', newVideo.video);
      }

      const response = await axios.put(`${BACKEND_URL}/api/videos/${editingVideo.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      const updatedVideos = videos.map((video) =>
        video.id === editingVideo.id ? { ...video, name: newVideo.name, url: response.data.video.url } : video
      );

      setVideos(updatedVideos);
      setEditingVideo(null);
      setNewVideo({ name: '', video: null });
      setUploadProgress(0);
      setSuccessMessage('Video editado con éxito');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setUploadProgress(0);
      setError('Error al guardar los cambios del video. Intenta nuevamente.');
    }
  };

  // Eliminar un video
  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/videos/${id}`);  // Usar BACKEND_URL
      const updatedVideos = videos.filter(video => video.id !== id);
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error al eliminar el video:', error);
    }
  };

  // Abrir el modal para asignar el video a una página
  const handleOpenAssignModal = (video) => {
    setSelectedVideo(video);
    setShowAssignModal(true);
  };

  // Cerrar el modal de asignación
  const handleCloseAssignModal = () => {
    setSelectedVideo(null);
    setShowAssignModal(false);
  };

  return (
    <div className="container my-5">
      <h2>Administrar Videos</h2>

      {/* Lista de videos */}
      <h3>Videos existentes:</h3>
      {videos.length > 0 ? (
        <ul className="list-group mb-4">
          {videos.map((video) => (
            video && video.name ? (
              <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{video.name}</strong>
                  <video src={video.url} controls style={{ maxWidth: '100px', marginLeft: '20px' }} />
                  {video.isPrincipal && <span className="badge bg-primary ms-2">Principal</span>}
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditVideo(video)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSetPrincipal(video.id)}
                  >
                    Marcar como Principal
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleOpenAssignModal(video)}
                  >
                    Asignar a Página
                  </button>
                </div>
              </li>
            ) : null
          ))}
        </ul>
      ) : (
        <p>No hay videos disponibles.</p>
      )}

      {/* Progreso de la subida */}
      {uploadProgress > 0 && (
        <div className="mb-4">
          <label>Progreso de la subida:</label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* Formulario para agregar o editar un video */}
      <h3>{editingVideo ? 'Editar Video' : 'Agregar Nuevo Video'}</h3>
      <form onSubmit={editingVideo ? handleSaveEdit : handleAddVideo}>
        <div className="mb-3">
          <label htmlFor="videoName" className="form-label">Nombre del Video:</label>
          <input
            id="videoName"
            type="text"
            className="form-control"
            name="name"
            value={newVideo.name}
            onChange={handleInputChange}
            placeholder="Ej. Video de Introducción"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="videoFile" className="form-label">Subir Video:</label>
          <input
            id="videoFile"
            type="file"
            className="form-control"
            name="video"
            accept="video/*"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingVideo ? 'Guardar Cambios' : 'Agregar Video'}
        </button>
        {editingVideo && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingVideo(null)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Mensajes de error y éxito */}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>}

      {/* Modal de asignación */}
      {selectedVideo && (
        <VideoAdminAsignador
          show={showAssignModal}
          handleClose={handleCloseAssignModal}
          selectedVideo={selectedVideo}
        />
      )}
    </div>
  );
}

export default VideoAdmin;
