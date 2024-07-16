import React, { useState, useEffect } from 'react';

const ContactForm = ({ addContact, editingContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!email) newErrors.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Dirección de correo inválida';
    if (!phone) newErrors.phone = 'El teléfono es obligatorio';
    else if (!/^[0-9]{10}$/.test(phone)) newErrors.phone = 'El teléfono debe tener 10 dígitos';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addContact({ name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
      setErrors({});
    }
  };

  return (
    <div className="container card mb-3">
      <div className="card-body">
        <h5 className="card-title">{editingContact ? 'Editar Contacto' : 'Agregar Contacto'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formName" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="formName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="formEmail" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="formEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="formPhone" className="form-label">Teléfono</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="formPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>
          <div className='col text-center'>
          <button type="submit" className="btn btn-primary">
            {editingContact ? 'Actualizar' : 'Agregar'} Contacto
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;