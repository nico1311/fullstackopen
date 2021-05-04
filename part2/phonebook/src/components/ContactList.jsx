import React from 'react';

const ContactList = ({persons, filter, removeContact}) => {
  if (filter.trim()) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  }
  return (
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

export default ContactList;
