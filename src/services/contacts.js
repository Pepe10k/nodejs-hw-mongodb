import Contact from '../models/contact.js';

const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error(`Error fetching contacts: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error(`Error fetching contact: ${error.message}`);
  }
};

export default {
  getAllContacts,
  getContactById,
};
