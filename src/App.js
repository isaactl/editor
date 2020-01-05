import React from 'react';
// import Editor from './konstellate-editor/editor';
// import Editor from './monaco-editor/editor';
// import DEditor from './monaco-editor/DEditor';
import Schema from './swagger';
import Env from './components/env'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>What to show?</h1>
      <Env schema={Schema}/>
    </div>
  );
}

export default App;
