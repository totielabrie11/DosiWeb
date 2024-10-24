import React, { useState } from 'react';
import './Contacto.css';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        motivoConsulta: ''
    });
    const [file, setFile] = useState(null); // Estado para manejar el archivo seleccionado
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Se requiere un nombre.';
        if (!formData.email) {
            newErrors.email = 'Se requiere un email.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido.';
        }
        if (!formData.phone) newErrors.phone = 'Se requiere un teléfono.';
        if (!formData.motivoConsulta) newErrors.motivoConsulta = 'Debe seleccionar un motivo de consulta.';
        if (!formData.message) newErrors.message = 'Se requiere un mensaje.';

        // Validación adicional si se selecciona "Trabajar con Nosotros"
        if (formData.motivoConsulta === 'Trabajar con Nosotros' && !file) {
            newErrors.file = 'Debe subir su archivo de CV.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Guardar el archivo seleccionado en el estado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            setSuccess(null);

            const formDataToSend = new FormData(); // Usamos FormData para enviar tanto datos como archivos
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('motivoConsulta', formData.motivoConsulta);

            if (file) {
                formDataToSend.append('file', file); // Adjuntamos el archivo solo si está presente
            }

            try {
                const response = await fetch(`${BACKEND_URL}/api/contact`, {
                    method: 'POST',
                    body: formDataToSend, // Enviamos los datos del formulario
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccess(true);
                    setFormData({ name: '', email: '', phone: '', message: '', motivoConsulta: '' });
                    setFile(null); // Limpiamos el estado del archivo
                } else {
                    setSuccess(false);
                    console.error('Error en el envío:', data.error);
                }
            } catch (error) {
                setSuccess(false);
                console.error('Error en la solicitud:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Contáctanos</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <form id="contactForm" onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
                <div className="row align-items-stretch mb-5 form-row-flex">
                    <div className="col-md-6 col-md-6-flex">
                        <div className="form-group">
                        <select 
                            className={`form-control form-control-fixed-height ${errors.motivoConsulta ? 'is-invalid' : ''}`} 
                            id="motivoConsulta" 
                            value={formData.motivoConsulta} 
                            onChange={handleInputChange} 
                            disabled={loading}
                        >
                            <option value="">Indique motivo de consulta *</option>
                            <option value="Servicio Técnico">Por servicio técnico</option>
                            <option value="Consulta Técnica">Consulta Técnica</option> {/* Nueva opción */}
                            <option value="Pago a Proveedores">Por pago a proveedores</option>
                            <option value="Refrigeración">Para refrigeración</option>
                            <option value="Distribuidor">Para ser distribuidor</option>
                            <option value="Trabajar con Nosotros">Trabajar con nosotros</option>
                        </select>

                            {errors.motivoConsulta && <div className="invalid-feedback">{errors.motivoConsulta}</div>}
                        </div>
                        <div className="form-group">
                            <input 
                                className={`form-control form-control-fixed-height ${errors.name ? 'is-invalid' : ''}`}
                                id="name" 
                                type="text" 
                                placeholder="Tu Nombre *" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                disabled={loading}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <input 
                                className={`form-control form-control-fixed-height ${errors.email ? 'is-invalid' : ''}`} 
                                id="email" 
                                type="email" 
                                placeholder="Tu Email *" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                disabled={loading}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group mb-md-0">
                            <input 
                                className={`form-control form-control-fixed-height ${errors.phone ? 'is-invalid' : ''}`} 
                                id="phone" 
                                type="tel" 
                                placeholder="Tu Teléfono *" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                                disabled={loading}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>
                    <div className="col-md-6 form-group-textarea">
                        <div className="form-group">
                            <textarea 
                                className={`form-control ${formData.motivoConsulta !== 'Trabajar con Nosotros' ? 'expand' : ''}`} 
                                id="message" 
                                placeholder="Tu Mensaje *" 
                                value={formData.message} 
                                onChange={handleInputChange} 
                                disabled={loading}
                            />
                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>

                        {formData.motivoConsulta === 'Trabajar con Nosotros' && (
                            <div className="form-group mt-3">
                                <label htmlFor="file" className="form-label">Sube tu CV</label>
                                <input 
                                    type="file" 
                                    id="file" 
                                    className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                {errors.file && <div className="invalid-feedback">{errors.file}</div>}
                            </div>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="text-center mb-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                )}

                {success === true && (
                    <div className="alert alert-success text-center" role="alert">
                        ¡Tu mensaje ha sido enviado exitosamente!
                    </div>
                )}
                {success === false && (
                    <div className="alert alert-danger text-center" role="alert">
                        No se ha podido enviar tu mensaje. Inténtalo de nuevo.
                    </div>
                )}

                <div className="text-center">
                    <button 
                        className="btn btn-primary btn-xl text-uppercase" 
                        id="submitButton" 
                        type="submit" 
                        disabled={loading}
                    >
                        Enviar Mensaje
                    </button>
                </div>
            </form>
            </div>
        </section>
    );
};

export default Contacto;
