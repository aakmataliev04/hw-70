import axiosApi from '../axiosApi';
import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, ApiContacts, Contact} from '../types';
import {AppDispatch} from '../app/store';

export const fetchContacts = createAsyncThunk<
  Contact[],
  undefined,
  { dispatch: AppDispatch }
>('contacts/fetchContacts', async (): Promise<Contact[]> => {
  const {data: contacts} = await axiosApi.get<ApiContacts | null>('/contacts.json');

  let newContacts: Contact[] = [];

  if (contacts) {
    newContacts = Object.keys(contacts).map((key) => ({
      id: key,
      ...contacts[key],
    }));
  }

  return newContacts;
});


export const createContact: AsyncThunk<void, ApiContact, { dispatch: AppDispatch }> =
  createAsyncThunk<void, ApiContact, { dispatch: AppDispatch }>(
    'contacts/createContact',
    async (contact: ApiContact) => {
      await axiosApi.post('/contacts.json', contact);
    }
  );