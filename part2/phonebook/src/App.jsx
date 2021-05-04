import React, { useEffect, useState } from 'react';
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
} from './services/phonebook';

const NewContactForm = ({newName, newNumber, onInputChange, addContact}) => {
  return(
    <form onSubmit={addContact}>
      <div>
      name: <input id="name" value={newName} onChange={onInputChange} />
      </div>
      <div>
      number: <input id="number" value={newNumber} onChange={onInputChange} />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
  )
};

const ContactList = ({persons, filter, removeContact}) => {
  if (filter.trim()) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  }
  return(
    <ul>
      {persons.map((person) => {
        return <li key={person.id}>
          <b>{person.name}</b>: {person.number}&nbsp;
          <button onClick={() => removeContact(person.id)}>delete</button>
        </li>
      })}
    </ul>
  );
};

const Filter = ({filter, onChange}) => {
  return(
    <div>
      Search filter: <input value={filter} onChange={onChange} />
    </div>
  )
};

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState(''),
    [ newNumber, setNewNumber ] = useState(''),
    [ filter, setFilter ] = useState('');

  useEffect(() => {
    getAllContacts().then((data) => setPersons(data));
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
        });
      } else return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      createContact(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact))
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
      });
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={onFilterChange} />
      <br />

      <NewContactForm newName={newName} newNumber={newNumber}
        onInputChange={onInputChange} addContact={addContact} />

      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} removeContact={removeContact} />
    </div>
  )
};

export default App;
