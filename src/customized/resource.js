import React from 'react';
import Resource from './resource.json';
import Form from 'react-jsonschema-form';
import './resource.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: Resource,
            formData: {
                "limits": {
                    "cpu": "500m",
                    "memory": "128Mi"
                },
                "requests": {
                    "cpu": "500m",
                    "memory": "128Mi"
                }
            },
        };
    }

    componentDidMount() {
    }

    // https://jsfiddle.net/69z2wepo/68259/
    handleChange(data) {
        const formData = JSON.parse(JSON.stringify(data.formData));
        // console.log(JSON.stringify(data.formData));
        this.setState({
            formData: formData
        })
    }

    onSubmit(data) {
        console.log(JSON.stringify(data.formData))
    }

    customFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props;
        return (
            <div className={classNames}>
                <label htmlFor={id} style={{marginRight: "20px", width: "80px"}}>{label}{required ? "*" : null}</label>
                {description}
                {children}
                {errors}
                {help}
            </div>
        );
    }

    render() {
        return (
            <Form
                schema={this.state.schema}
                formData={this.state.formData}
                onSubmit={this.onSubmit.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
