import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./table";


interface AppProps{
  title:string;
}

function App(props:AppProps) {
  return (
    <div className='App'>
        <div className='heading'>
        <h1>{props.title}</h1></div>
        <Table/>
    </div>
  );
}

export default App;
