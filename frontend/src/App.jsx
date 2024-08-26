import React from 'react';
import Form from './components/pages/Form/Form';
import './App.css';
import Header from './components/Header/Header';
import ContactList from './components/pages/ContactList/ContactList';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';


export default function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header
          title={"This application is used to store and manage client data"}
          perex={"Fetching data app"}
        />
        <Menu />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<Form />}/>
            <Route exact path="/add-contact" element={<ContactList />}/>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}