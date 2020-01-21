import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import SwaggerParser from 'swagger-parser';
import YAML from 'js-yaml';
import {Validator} from 'jsonschema';
import axios from 'axios'

class Monaco extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 'kind: Deployment\nname: hello world',
            schema: null,
        };
        this.validate = this.validate.bind(this);
    }

    validate() {
        console.log(this.state.schema);
        let code = this.refs.monaco.editor.getValue();
        let validator = new Validator();
        try {
            let res = validator.validate(YAML.load(code), this.state.schema);
            console.log(res.errors)
        }catch (e) {
            console.log(e.message)
        }
    }

    componentDidMount() {
        this.setState({monaco: this.refs.monaco});
        this.refs.monaco.editor.onDidChangeModelContent(this.handleMonacoChangeEvent)
    }

    handleMonacoChangeEvent(e) {
         // console.log(e)
    }

    loadData() {
        // let api = 'https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json';
        let api = 'https://raw.githubusercontent.com/kubernetes/kubernetes/v1.14.9/api/openapi-spec/swagger.json';
        axios.get(api).then((response) => {
            SwaggerParser.validate(response.data, (err, api) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                    // console.log(api.definitions["io.k8s.api.apps.v1.Deployment"])
                    // console.log(JSON.stringify(api.definitions["io.k8s.api.apps.v1.Deployment"]))
                    let schema = api.definitions["io.k8s.api.apps.v1.Deployment"];

                    this.setState({schema: schema});
                }
            });
        }).catch(function (err) {
            console.log(err)
        })
    }

    editorWillMount(monaco) {
        console.log("will mount");
        monaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({})
    }

    editorDidMount(editor, monaco) {
        // console.log('editorDidMount', editor);
        editor.focus();
    }

    onChange(newValue, e) {
        // console.log('onChange', newValue, e);
    }

    render() {
        // if (this.state.schema == null) {
        //     this.loadData()
        // }

        const options = {
            selectOnLineNumbers: true,
            language: 'yaml',
            showFoldingControls: 'always',
            autoIndent: 'full',
            wrappingIndent: 'deepIndent'
        };

        return (
            <div>
                <input
                    type="button"
                    value="validate"
                    onClick={this.validate}
                />
                <MonacoEditor
                    ref="monaco"
                    width="800"
                    height="600"
                    theme="vs-dark"
                    value={this.state.code}
                    options={options}
                    onChange={this.onChange}
                    editorWillMount={this.editorWillMount}
                    editorDidMount={this.editorDidMount}
                    context={this.state.schema}
                />
            </div>
        );
    }
}

export default Monaco;