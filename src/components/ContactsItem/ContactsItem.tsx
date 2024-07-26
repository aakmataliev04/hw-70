import React, {useState} from 'react';
import './ContactsItem.css';
import {Contact} from '../../types';
import Modal from '../Modal/Modal';
import {deleteContact, fetchContacts} from '../../store/contactsThunks';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {Link} from 'react-router-dom';
import {selectIsDeleting} from '../../store/contactsSlice';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import {toast} from 'react-toastify';

interface Props {
  contact: Contact;
}

const ContactsItem: React.FC<Props> = ({contact}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectIsDeleting);

  const onDelete = async (contactId: string) => {
    try {
      await dispatch(deleteContact(contactId));
      await dispatch(fetchContacts());
      setShowModal(false);
    } finally {
      toast.success('Contact deleted!');
    }
  };
  const modalContent = (
    <>
      <div className="contact-info" style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
        <div className="contact-info-imageWrapper" style={{width: '150px'}}>
          <img src={contact.photoUrl} alt={contact.name}/>
        </div>
        <div className="contact-details-wrapper">
          <h2>{contact.name}</h2>
          <div className="contact-details"
               style={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
            <a href="#" className="phone">{contact.phone}</a>
            <a href="#" className="phone">{contact.email}</a>
          </div>
        </div>
      </div>
      <div className="contact-btn-wrapper">
        <Link className="contact-btn" to={`/edit/${contact.id}`}>Edit</Link>
        <button onClick={() => onDelete(contact.id)} className="contact-btn contact-delete-btn" disabled={isDeleting}>
          {isDeleting && <div style={{margin: '0 5px'}}><ButtonSpinner/></div>}
          Delete
        </button>
      </div>
    </>
  );

  return (
    <>
      {showModal ?
        (<Modal
          show={showModal}
          onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal>) : null}
      <div className="contact" onClick={() => setShowModal(true)}>
        <div className="contact-avatar">
          <img src={contact.photoUrl} alt=""/>
        </div>
        <div className={'contact-control'}>
          <h4 className={'contact-title'}>{contact.name}</h4>
        </div>
      </div>
    </>

  );
};

export default ContactsItem;