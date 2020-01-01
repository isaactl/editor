import React from 'react';
// import Editor from './konstellate-editor/editor';
import Editor from './monaco-editor/editor';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>What to show?</h1>
      <Editor />
    </div>
  );
}

export default App;
