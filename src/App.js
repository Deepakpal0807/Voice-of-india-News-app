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


export default class App extends Component {
   
  state={
    progress:0,
    country:"us"
    

  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  
  
  apikey=process.env.API_KEY
  render() {
    return (
      <div>
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      
      />
        
        <Routes> 
       
     
        <Route exact path="/" element={<News setprogress={this.setprogress} apikey={this.apikey}  key="general" country="in" pageSize={9} category="general" sub="General"/>}/>
        
        <Route exact path="/business" element={<News setprogress={this.setprogress} apikey={this.apikey} key="business" country="in" pageSize={9} category="business" sub="Business"/>}/>

        <Route exact path="/entertainment" element={<News setprogress={this.setprogress} apikey={this.apikey} key="entertainment" country="in" pageSize={9} category="entertainment" sub="Entertainment"/>}/>
        <Route exact path="/health" element={<News setprogress={this.setprogress} apikey={this.apikey} key="health" country="in" pageSize={9} category="health" sub="Health"/>}/>
        
        <Route exact path="/science" element={<News setprogress={this.setprogress} apikey={this.apikey} key="science" country="in" pageSize={9} category="science" sub="Science"/>}/>
        <Route exact path="/sports" element={<News setprogress={this.setprogress} apikey={this.apikey} key="sports" country="in" pageSize={9} category="sports"sub="Sports"/>} />
        <Route exact path="/technology" element={<News setprogress={this.setprogress} apikey={this.apikey} key="technology" country="in" pageSize={9} category="technology"  sub="Technology"/>}/>
        
      
      </Routes>
      </Router>
      </div>
    )
  }
}

