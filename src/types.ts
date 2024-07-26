export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface ApiContact {
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface ApiContacts {
  [id: string]: ApiContact;
}