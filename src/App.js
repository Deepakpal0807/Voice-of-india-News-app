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
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';


const  App =()=> {
  const [progress, setprogress] = React.useState(0);
  const [country, setCountry] = React.useState('in');

  
const updateprogress=(progress)=>{
  setprogress(progress);
}

  // const updateCountry = (newCountry) => {
  //   setCountry(newCountry);
  // };

  
    return (
      <div>
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      
      />
        
        <Routes> 
       
        <Route
            exact
            path="/"
            element={<News setprogress={updateprogress} key="general" country={country}  pageSize={9} category="general" sub="General" />}
          />
        {/* <Route exact path="/" element={ <News   setprogress={updateprogress}  key="general" country={country} updatecountry={updateCountry} pageSize={9} category="general" sub="General"/>}/> */}
        
        <Route exact path="/business" element={ <News   setprogress={ updateprogress}  key="business" country={country}  pageSize={9} category="business" sub="Business"/>}/>

        <Route exact path="/entertainment" element={ <News   setprogress={ updateprogress}key="entertainment" country={country}  pageSize={9} category="entertainment" sub="Entertainment"/>}/>
        <Route exact path="/health" element={ <News   setprogress={ updateprogress}  key="health" country={country} pageSize={9} category="health" sub="Health"/>}/>
        
        <Route exact path="/science" element={ <News   setprogress={ updateprogress} key="science" country={country} pageSize={9} category="science" sub="Science"/>}/>
        <Route exact path="/sports" element={ <News   setprogress={ updateprogress}  key="sports" country={country} pageSize={9} category="sports"sub="Sports"/>} />
        <Route exact path="/technology" element={ <News   setprogress={ updateprogress} key="technology" country={country}  pageSize={9} category="technology"  sub="Technology"/>}/>
        
      
      </Routes>
      </Router>
      </div>
    )
  }
  export default App


