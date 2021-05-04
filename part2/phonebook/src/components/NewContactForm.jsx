import React from 'react';

const NewContactForm = ({newName, newNumber, onInputChange, addContact}) => {
  return (
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
  );
};

export default NewContactForm;
