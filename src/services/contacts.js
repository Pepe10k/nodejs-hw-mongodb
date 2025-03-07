import { ContactsCollection } from '../models/contact.js';

export const getContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};
