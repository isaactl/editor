import React from 'react';
import KindPicker from './kind.pick';
import Monaco from './monaco';
import './editor.css';

class Editor extends React.Component {
    render() {
        return (
            <div className='editor-container'>
                <KindPicker />
                <Monaco />
            </div >
        )
    }
}

export default Editor;