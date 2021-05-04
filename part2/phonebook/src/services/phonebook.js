import axios from 'axios';

const getAllContacts = () => {
	return new Promise((resolve, reject) => {
	    axios.get('http://localhost:3001/persons')
      .then(({data}) => resolve(data))
      .catch(reject);
	});
}

const createContact = (newContact) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3001/persons', newContact)
      .then(({data}) => resolve(data))
      .catch(reject);
  });
}

const updateContact = (id, newData) => {
  return new Promise((resolve, reject) => {
    axios.put(`http://localhost:3001/persons/${id}`, newData)
    .then(({data}) => resolve(data))
    .catch(reject);
  });
}

const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:3001/persons/${id}`)
      .then(resolve)
      .catch(reject);
  });
}

export {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
}

