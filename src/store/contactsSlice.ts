import {ApiContact, Contact} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createContact, fetchContacts} from './contactsThunks';

export interface ContactsState {
  contactMutation: ApiContact;
  contacts: Contact[] | null;
  createLoading: boolean;
  fetchLoading: boolean;
  isError: boolean;
}
const initialState : ContactsState = {
  contactMutation: {
    name: '',
    phone: '',
    email: '',
    photoUrl: '',
  },
  contacts: null,
  createLoading: false,
  fetchLoading: false,
  isError: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactMutation(state, {payload : {name, value}}) {
      console.log(name, value);
      state.contactMutation[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.createLoading = true;
        state.isError = false;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.createLoading = false;
        state.contactMutation = {name: '', phone: '', email: '', photoUrl: ''};
      })
      .addCase(createContact.rejected, (state) => {
        state.createLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.fetchLoading = true;
        state.isError = false;
      })
      .addCase(fetchContacts.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.contacts = payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.fetchLoading = false;
        state.isError = true;
      });
  },
  selectors: {
    selectContactMutation: (state) => state.contactMutation,
    selectContacts: (state) => state.contacts,
  }
});

export const contactsReducer = contactsSlice.reducer;

export const {setContactMutation} = contactsSlice.actions;
export const {selectContactMutation, selectContacts} = contactsSlice.selectors;