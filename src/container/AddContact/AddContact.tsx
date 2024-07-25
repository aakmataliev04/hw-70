import React, {ChangeEvent, FormEvent} from 'react';
import './AddContact.css';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectContactMutation, setContactMutation} from '../../store/contactsSlice';
import {ApiContact} from '../../types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {createContact} from '../../store/contactsThunks';

const AddContact: React.FC = () => {
  const dispatch = useAppDispatch();
  const contactMutation = useAppSelector(selectContactMutation);
  const navigate = useNavigate();


  const onSubmit = async (event: FormEvent<HTMLFormElement>, contact: ApiContact) => {
    event.preventDefault();
    try {
      await dispatch(createContact(contact)).unwrap();
      toast.success('Contact Created!');
    } catch (e) {
      toast.error('Could not create contact!');
    } finally {
      navigate('/');
    }
  };
  const changeMutation = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(setContactMutation({name , value}));
  };
  const form = (
    <form onSubmit={(event) => onSubmit(event, contactMutation)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={contactMutation.name}
          id="name"
          type="text"
          name="name"
          className="form-control"
          placeholder={'Name'}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={contactMutation.phone}
          id="phone"
          type="number"
          name="phone"
          className="form-control"
          placeholder={'Phone'}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={contactMutation.email}
          id="email"
          type="email"
          name="email"
          className="form-control"
          placeholder={'Email'}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="photoUrl">Photo</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={contactMutation.photoUrl}
          min={1}
          type={'url'}
          id="photoUrl"
          name="photoUrl"
          className="form-control"
          placeholder={'Photo Link'}
          required
        />
      </div>

      <div className={'photo-preview'}>
        <span>Photo Preview:</span>
        <img className={'photo-preview-image'} src={contactMutation.photoUrl} alt=""/>
      </div>

      <button type="submit" className="btn">
        {/*{isLoading && <ButtonSpinner />}*/}
        {'Save'}
      </button>
    </form>
  );
  return (
    <div className={'container add-container'}>
      <h2>Add New Contact</h2>

      {form}
    </div>
  );
};

export default AddContact;