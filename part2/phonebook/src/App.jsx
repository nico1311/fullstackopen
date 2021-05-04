import React, { useEffect, useState } from 'react';
import { ContactList, Filter, Message, NewContactForm } from './components';
import { getAllContacts, createContact, updateContact, deleteContact } from './services/phonebook';
import './app.css';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState(''),
    [ newNumber, setNewNumber ] = useState(''),
    [ filter, setFilter ] = useState('');
  const [ message, setMessage ] = useState({});

  useEffect(() => {
    getAllContacts().then((data) => setPersons(data)).catch((err) => {
      setMessage({
        text: `Could not fetch contact list.`,
        style: 'error'
      });
    });
  }, []);

  const onInputChange = ({target}) => {
    switch (target.id) {
      case 'name': {
        setNewName(target.value);
        break;
      }
      case 'number': {
        setNewNumber(target.value);
        break;
      }
      default: {
        console.error('unknown input field');
      }
    }
  };

  const onFilterChange = ({target}) => setFilter(target.value);

  const addContact = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) return;
    const result = persons.find((person) => person.name === newName);
    if (result) {
      if (window.confirm(`${result.name} is already on the phonebook. Replace the number?`)) {
        updateContact(result.id, {
          name: result.name,
          number: newNumber
        }).then((data) => {
          setPersons(persons.map((person) => person.id === result.id ? data : person));
          setMessage({
            text: `Updated ${data.name}'s number`,
            style: 'success'
          });
          setTimeout(() => setMessage({}), 2500);
        }).catch((err) => {
          setMessage({
            text: `Cannot update ${result.name}'s number: ${err.message}`,
            style: 'error'
          });
          setTimeout(() => setMessage({}), 2500);
        });
      } else return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      createContact(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
        setMessage({
          text: `Added ${newName} to the phonebook`,
          style: 'success'
        });
        setTimeout(() => setMessage({}), 2500);
      }).catch((err) => {
        setMessage({
          text: `Cannot add ${newName}: ${err.message}`,
          style: 'error'
        });
        setTimeout(() => setMessage({}), 2500);        
      });      
    }

    setNewName('');
    setNewNumber('');
  };

  const removeContact = (id) => {
    const toRemove = persons.find((item) => item.id === id);
    if (!toRemove) {
      console.error(`No contact with id ${id}`);
      return;
    }

    if (window.confirm(`Delete ${toRemove.name}?`)) {
      deleteContact(id).then(() => {
        setPersons(persons.filter((item) => item.id !== id));
        setMessage({
          text: `Removed ${toRemove.name} from the phonebook`,
          style: 'success'
        });
        setTimeout(() => setMessage({}), 2500);
      }).catch((err) => {
        setMessage({
          text: `Cannot remove ${toRemove.name}: ${err.message}`,
          style: 'error'
        });
        setTimeout(() => setMessage({}), 2500);        
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message.text ? <Message text={message.text} style={message.style} /> : ''}

      <Filter filter={filter} onChange={onFilterChange} />
      <br />

      <NewContactForm newName={newName} newNumber={newNumber}
        onInputChange={onInputChange} addContact={addContact} />

      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} removeContact={removeContact} />
    </div>
  );
};

export default App;
