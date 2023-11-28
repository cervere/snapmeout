import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function DataEntry() {
  return (
    <div className="page-container">
      <h1>Data Entry</h1>
      <div className="content-container">
        <input type="text" placeholder="Enter data here" />
      </div>
    </div>
  );
}

function DataDisplay() {
  return (
    <div className="page-container">
      <h1>Data Display</h1>
      <div className="content-container">
        <ul>
          <li>Data 1</li>
          <li>Data 2</li>
          <li>Data 3</li>
          <li>Data 4</li>
          <li>Data 5</li>
          <li>Data 6</li>
          <li>Data 7</li>
          <li>Data 8</li>
          <li>Data 9</li>
          <li>Data 10</li>
          <li>Data 1</li>
          <li>Data 2</li>
          <li>Data 3</li>
          <li>Data 4</li>
          <li>Data 5</li>
          <li>Data 6</li>
          <li>Data 7</li>
          <li>Data 8</li>
          <li>Data 9</li>
          <li>Data 10</li>          <li>Data 1</li>
          <li>Data 2</li>
          <li>Data 3</li>
          <li>Data 4</li>
          <li>Data 5</li>
          <li>Data 6</li>
          <li>Data 7</li>
          <li>Data 8</li>
          <li>Data 9</li>
          <li>Data 10</li>        
          <li>Data 1</li>
          <li>Data 2</li>
          <li>Data 3</li>
          <li>Data 4</li>
          <li>Data 5</li>
          <li>Data 6</li>
          <li>Data 7</li>
          <li>Data 8</li>
          <li>Data 9</li>
          <li>Data 10</li></ul>
        <div className="icon-container">
          <i className="fas fa-plus-circle"></i>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
      <div>
        <Routes>
        <Route exact path="/" element={<DataEntry />} />
        <Route path="/data-display" element={<DataDisplay />} />
        </Routes>
        <div className="nav-container">
          <NavLink to="/" className="nav-link">
            <i className="fas fa-pencil-alt"></i>
            <span>Data Entry</span>
          </NavLink>
          <NavLink to="/data-display" className="nav-link">
            <i className="fas fa-list"></i>
            <span>Data Display</span>
          </NavLink>
        </div>
      </div>
  );
}

export default App;
