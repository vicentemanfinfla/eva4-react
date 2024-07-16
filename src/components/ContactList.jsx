import React from 'react';

const ContactList = ({ contacts, editContact, deleteContact }) => {
  return (
    <div className='container'>
      <h2 className="mb-4">Lista de Contactos</h2>
      <div className="row">
        {contacts.map((contact) => (
          <div className="col-md-4 mb-3 d-flex" key={contact.id}>
            <div className="card flex-fill">
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {contact.email}<br />
                  <strong>Teléfono:</strong> {contact.phone}
                </p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => editContact(contact.id)}
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteContact(contact.id)}
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;