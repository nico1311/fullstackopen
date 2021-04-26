import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const ContactList = ({persons, filter}) => {
  if (filter.trim()) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  }
  return(
    <ul>
      {persons.map((person) => {
        return <li key={person.name}>{person.name}: {person.number}</li>
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
    axios.get('http://localhost:3001/persons').then(({data}) => {
      setPersons(data);
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
    if (result) return alert(`${result.name} is already on the phonebook.`);
    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={onFilterChange} />
      <br />

      <NewContactForm newName={newName} newNumber={newNumber}
        onInputChange={onInputChange} addContact={addContact} />

      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} />
    </div>
  )
};

export default App;
