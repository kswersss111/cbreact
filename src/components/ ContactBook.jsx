import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ContactBook = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.email
    ) {
      if (editMode) {
        const updatedContacts = contacts.map((contact) => {
          if (contact.email === formData.email) {
            return { ...formData };
          }
          return contact;
        });
        setContacts(updatedContacts);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        });
        setEditMode(false);
        setEditContactId(null);
      } else {
        setContacts([...contacts, formData]);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        });
      }
    } else {
      alert("Пусто");
    }
  };

  const handleEdit = (email) => {
    const contactToEdit = contacts.find((contact) => contact.email === email);
    if (contactToEdit) {
      setFormData({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        phoneNumber: contactToEdit.phoneNumber,
        email: contactToEdit.email,
      });
      setEditMode(true);
      setEditContactId(contactToEdit.email);
    }
  };

  const handleDelete = (email) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.email !== email
    );
    setContacts(updatedContacts);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div>
      <h1>Contact Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">
          {editMode ? "Edit Contact" : "Add Contact"}
        </button>
        <Button variant="primary" onClick={handleShow}>
          Edit Contact
        </Button>
      </form>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            {contact.firstName} {contact.lastName} - {contact.phoneNumber}{" "}
            <button onClick={() => handleEdit(contact.email)}>Edit</button>{" "}
            <button onClick={() => handleDelete(contact.email)}>Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactBook;
