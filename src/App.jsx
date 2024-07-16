import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import SortButton from './components/SortButton';
import Pagination from './components/Pagination';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;

  // Cargar contactos del localStorage al montar el componente
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  // Añadir o editar contacto
  const addContact = (contact) => {
    let updatedContacts;
    if (editingContact) {
      updatedContacts = contacts.map((c) =>
        c.id === editingContact.id ? { ...contact, id: c.id } : c
      );
      setEditingContact(null);
    } else {
      contact.id = new Date().getTime();
      updatedContacts = [...contacts, contact];
    }
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  // Editar contacto
  const editContact = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    setEditingContact(contactToEdit);
  };

  // Eliminar contacto
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  // Filtrar contactos según la búsqueda
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase()) ||
    contact.email.toLowerCase().includes(query.toLowerCase()) ||
    contact.phone.includes(query)
  );

  // Ordenar contactos según la configuración
  const sortedContacts = isSortedAlphabetically
    ? filteredContacts.sort((a, b) => a.name.localeCompare(b.name))
    : filteredContacts.sort((a, b) => a.id - b.id);

  // Paginar contactos
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Alternar el orden de clasificación
  const toggleSortOrder = () => {
    setIsSortedAlphabetically(!isSortedAlphabetically);
  };

  return (
    <div>
      <h1 className='text-center'>Directorio de Contactos</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <SortButton isSortedAlphabetically={isSortedAlphabetically} toggleSortOrder={toggleSortOrder} />
      <ContactForm addContact={addContact} editingContact={editingContact} />
      <ContactList
        contacts={currentContacts}
        editContact={editContact}
        deleteContact={deleteContact}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedContacts.length / contactsPerPage)}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default App;