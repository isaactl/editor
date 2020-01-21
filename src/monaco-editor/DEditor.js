import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class DEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calculateValue: '',
        };
    }

    componentWillMount() {
        // 拦截判断是否离开当前页面
        window.addEventListener('beforeunload', this.beforeunload);
    }

    componentDidMount() {
        this.setState({
            calculateValue: this.props.calculateValue
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.calculateValue !== nextProps.calculateValue) {
            this.setState({
                calculateValue: nextProps.calculateValue,
            })
        }
    }

    beforeunload() {
        // 如果是刷新页面 清空sessionStorage
        sessionStorage.removeItem('isLoadDEditor');
    }

    onBlur = () => {
        const { calculateValue } = this.state;
        // this.props.value(calculateValue);
        // if (calculateValue) {
        //     this.props.isEditorErrFn(false);
        // }
    };

    onChangeHandle = (value, e) => {
        this.setState({
            calculateValue: value
        });
    };

    editorDidMountHandle = async (editor, monaco) => {
    };

    options = {
        selectOnLineNumbers: true,
        renderSideBySide: false
    };

    render() {
        return (
            <div onBlur={this.onBlur}>
                <MonacoEditor
                    ref="monaco"
                    width="900"
                    height="200"
                    language="yaml"
                    theme="vs-dark"
                    value={this.state.calculateValue}
                    options={this.options}
                    onChange={this.onChangeHandle}
                    editorDidMount={this.editorDidMountHandle}
                />
            </div>
        )
    }
}

export default DEditor;