import React from 'react';
import './App.css';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import ArtDetail from './Components/ArtDetail';
import ContactUs from './Components/ContactUs';
import Header from './Components/Header';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Header />
      {/* routing for single page app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/art/:id" element={<ArtDetail />} />
      </Routes>
      {/* footer area */}
      <div className="footer">
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'start' }}>
            <div style={{ fontSize: "18px" }}><strong>Contact</strong> - 2265579914</div>
            <div style={{ fontSize: "18px" }}><strong>Email</strong>  - Akanksha.s1682@gmail.com</div>

          </div>
          <div style={{ textAlign: 'start', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href='https://www.linkedin.com/in/akanksha-s-686439302/' target="blank"><div><i style={{ fontSize: "30px" }} className="fa">&#xf08c;</i></div></a>
            <a href='https://github.com/Akanksha261020/Akanksha261020' target="blank" > <div><i style={{ fontSize: "30px" }} className="fa fa-github"></i></div></a>
            <a href='https://portfolio12-alpha.vercel.app/' target="blank"> <div><i style={{ fontSize: "30px" }} className="fa fa-user"></i></div></a>


          </div>

        </div>
        <div style={{ fontSize: '10px' }}>Created By Akanksha</div>
      </div>
    </div>
  );
}

export default App;
