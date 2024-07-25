import React from 'react';
import './ContactsItem.css';
import {Contact} from '../../types';

interface Props {
  contact: Contact;
}

const ContactsItem: React.FC<Props> = ({contact}) => {

  return (
    <div className="contact">
      <div className="contact-avatar">
        <img src={contact.photoUrl} alt=""/>
      </div>
      <div className={'contact-control'}>
        <h4 className={'contact-title'}>{contact.name}</h4>
      </div>
    </div>
  );
};

export default ContactsItem;