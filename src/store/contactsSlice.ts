import {ApiContact, Contact} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from './contactsThunks';

export interface ContactsState {
  contactMutation: ApiContact;
  contacts: Contact[] | null;
  fetchLoading: boolean;
  isFetchingOneContact: boolean;
  isCreating: boolean;
  isUpdatingContact: boolean;
  isDeleting: boolean;
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
  fetchLoading: false,
  isFetchingOneContact: false,
  isCreating: false,
  isUpdatingContact: false,
  isDeleting: false,
  isError: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactMutation: (state, {payload : {name, value}}) => {
      state.contactMutation[name] = value;
    },
    clearContactMutation: (state) => {
      state.contactMutation = {name: '', phone: '', email: '', photoUrl: ''};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isCreating = true;
        state.isError = false;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isCreating = false;
        state.contactMutation = {name: '', phone: '', email: '', photoUrl: ''};
      })
      .addCase(createContact.rejected, (state) => {
        state.isCreating = false;
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
    builder
      .addCase(deleteContact.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.isDeleting = false;
        state.isError = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      });
    builder
      .addCase(fetchOneContact.pending, (state) => {
        state.contactMutation = {name: '', phone: '', email: '', photoUrl: ''};
        state.isFetchingOneContact = true;
        state.isError = false;
      })
      .addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
        state.isFetchingOneContact = false;
        state.contactMutation = contact;
      })
      .addCase(fetchOneContact.rejected, (state) => {
        state.isFetchingOneContact = false;
        state.isError = true;
      });
    builder
      .addCase(updateContact.pending, (state) => {
        state.isUpdatingContact = true;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isUpdatingContact = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.isUpdatingContact = false;
      });
  },
  selectors: {
    selectContactMutation: (state) => state.contactMutation,
    selectContacts: (state) => state.contacts,
    selectIsLoading: (state) => state.fetchLoading,
    selectIsLoadingOneContact: (state) => state.isFetchingOneContact,
    selectIsCreating: (state) => state.isCreating,
    selectIsUpdatingContact: (state) => state.isUpdatingContact,
    selectIsDeleting: (state) => state.isDeleting
  }
});

export const contactsReducer = contactsSlice.reducer;

export const {setContactMutation, clearContactMutation} = contactsSlice.actions;
export const {
  selectContactMutation,
  selectContacts,
  selectIsLoading,
  selectIsLoadingOneContact,
  selectIsCreating,
  selectIsUpdatingContact,
  selectIsDeleting
} = contactsSlice.selectors;