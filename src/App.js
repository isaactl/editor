import React from 'react';
// import Editor from './konstellate-editor/editor';
// import Editor from './monaco-editor/editor';
// import Customized from './customized/index'
import WithLoading from './components/withLoading'
import Service from "./pages/services";
import DataStore from './components/dataStore'
import './App.css';

let dataStore = DataStore.getInstance()

const ServiceList = WithLoading(
    Service,
    dataStore,
    dataStore.getServices
);

function App() {
  return (
    <div className="App">
      <h1>What to show?</h1>
      <ServiceList />
    </div>
  );
}

export default App;
