import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './container/Home/Home';
import Contacts from './container/Contacts/Contacts';
import AddContact from './container/AddContact/AddContact';
import EditContact from './container/EditContact/EditContact';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/contacts'} element={<Contacts/>}/>
        <Route path={'/add-contact'} element={<AddContact/>}/>
        <Route path={'/edit/:id'} element={<EditContact/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
