import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectContacts} from '../../store/contactsSlice';
import {fetchContacts} from '../../store/contactsThunks';
import ContactsItem from '../../components/ContactsItem/ContactsItem';
import './Contacts.css';

const Contacts: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
  console.log(contacts);
  return (
    <div className={'meals-list'}>
      {
        contacts !== null ? (
          contacts.map((contact) => {
            return (<ContactsItem key={contact.id} contact={contact}/>);
          })
        ) : (
          <h2>There is no Meals</h2>
        )
      }
    </div>
  );
};

export default Contacts;