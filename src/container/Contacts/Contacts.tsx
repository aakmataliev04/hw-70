import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectContacts} from '../../store/contactsSlice';
import {fetchContacts} from '../../store/contactsThunks';
import ContactsItem from '../../components/ContactsItem/ContactsItem';
import './Contacts.css';
import Preloader from '../../components/Preloader/Preloader';

const Contacts: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={'meals-list'}>
      {
        contacts !== null ? (
          contacts.map((contact) => {
            return (<ContactsItem key={contact.id} contact={contact}/>);
          })
        ) : (
          <div style={{display: 'flex', justifyContent: 'center', padding: '30vh 0'}}><Preloader/></div>
        )
      }
    </div>
  );
};

export default Contacts;