const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((item) => item.id === contactId);
  if (!contactToRemove) {
    return;
  }
  const newContacts = contacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    return null;
  }
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
