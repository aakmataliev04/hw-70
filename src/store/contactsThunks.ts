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

export const fetchOneContact: AsyncThunk<ApiContact, string, { dispatch: AppDispatch }> = createAsyncThunk<ApiContact, string>(
  'contacts/fetchOneContact',
  async (id) => {
    const { data: dish } = await axiosApi.get<ApiContact | null>(
      `/contacts/${id}.json`,
    );
    if (dish === null) {
      throw new Error('Not Found');
    }
    return dish;
  },
);

export const updateContact: AsyncThunk<void, {id: string, contact: ApiContact}, {dispatch: AppDispatch}> = createAsyncThunk<void, {id: string, contact: ApiContact}>(
  'contacts/updateContact',
  async ({id, contact}) => {
    await axiosApi.put(`/contacts/${id}.json`, contact);
  },
);

export const deleteContact: AsyncThunk<void, string, { dispatch: AppDispatch }> = createAsyncThunk<void, string>(
  'contacts/deleteContact',
  async (contactId) => {
      await axiosApi.delete(`/contacts/${contactId}.json`);
  },
);