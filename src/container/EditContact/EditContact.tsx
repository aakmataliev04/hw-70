import AddContact from '../AddContact/AddContact';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {fetchOneContact} from '../../store/contactsThunks';
import {selectIsLoadingOneContact} from '../../store/contactsSlice';
import Preloader from '../../components/Preloader/Preloader';

const EditContact: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoadingContact = useAppSelector(selectIsLoadingOneContact);


  useEffect(() => {
    if (id) {
      dispatch(fetchOneContact(id));
    }

  }, [dispatch, id]);
  return (
    <>
      {
        isLoadingContact ?
        <div style={{display: 'flex', justifyContent: 'center', padding: '36vh 0'}}><Preloader/></div>
        : <AddContact id={id && id}/>
      }
    </>
  );
};

export default EditContact;