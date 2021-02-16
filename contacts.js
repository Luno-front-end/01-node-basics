const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

// fs.writeFile(filename, data, [options]);

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => {
      throw error;
    });
}

// console.table(listContacts());
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      console.table(JSON.parse(data).find(({ id }) => id === contactId))
    )
    .catch((error) => {
      throw error;
    });
}

// console.table(getContactById());

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const deleteContact = parsedData.filter(({ id }) => id !== contactId);

      console.table(deleteContact);
      fs.writeFile(contactsPath, JSON.stringify(deleteContact));
      return deleteContact;
    })
    .catch((error) => {
      throw error;
    });
}
// removeContact(10);
function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const newContact = { name, email, phone };
      const addContact = parsedData.push(newContact);

      console.table(addContact);
      fs.writeFile(contactsPath, JSON.stringify(parsedData));
      return addContact;
    })
    .catch((error) => {
      throw error;
    });
}

// addContact("max", "gma@gma", 2312852);

module.exports = { listContacts, getContactById, removeContact, addContact };
