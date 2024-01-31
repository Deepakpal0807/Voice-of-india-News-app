import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
// import About from "./component/About";

// import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";


export default class App extends Component {
 
 
  render() {
    return (
      <div>
      <Router>
        <Navbar/>
        
        <Routes> 
        {/* <Route exact path="/general" element={<News key="general" country="in" pageSize={9} category="about"/>}/> */}
        <Route exact path="/" element={<News key="general" country="in" pageSize={9} category="general" sub="General"/>}/>
        <Route exact path="/business" element={<News key="business" country="in" pageSize={9} category="business" sub="Business"/>}/>
        <Route exact path="/entertainment" element={<News key="entertainment" country="in" pageSize={9} category="entertainment" sub="Entertainment"/>}/>
        <Route exact path="/health" element={<News key="health" country="in" pageSize={9} category="health" sub="Health"/>}/>
        <Route exact path="/general" element={<News key="general" country="in" pageSize={9} category="general" sub="General"/>}/>
        <Route exact path="/science" element={<News key="science" country="in" pageSize={9} category="science" sub="Science"/>}/>
        <Route exact path="/sports" element={<News key="sports" country="in" pageSize={9} category="sports"/>} sub="Sports"/>
        <Route exact path="/technology" element={<News key="technology" country="in" pageSize={9} category="technology"  sub="Technology"/>}/>
        
      
      </Routes>
      </Router>
      </div>
    )
  }
}

