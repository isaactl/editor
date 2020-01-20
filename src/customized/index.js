import React from 'react';
import Swagger from './swagger.json';
import CMKeyRef from './configMapKeyRef.json';
import Form from "react-jsonschema-form";
import SwaggerParser from 'swagger-parser';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            keyList: [],
            selected: '',
            formData: {}
        };

        this._loadSwagger=this._loadSwagger.bind(this);
    }

    componentDidMount() {
        // this._loadSwagger()
    }

    _loadSwagger() {
        SwaggerParser.validate(Swagger, (err, api) => {
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
    }

    CustomFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props;
        return (
            <div className={classNames}>
                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                {}
                {children}
                {errors}
                {description}
            </div>
        );
    }

    // https://jsfiddle.net/69z2wepo/68259/
    handleChange(data) {
        const formData = JSON.parse(JSON.stringify(data.formData));
        console.log(formData)
        if (this.state.selected !== formData.key) {
            formData.name = formData.key + "_set";

            CMKeyRef.properties.name = Object.assign(CMKeyRef.properties.name, {
                "enum": [
                    formData.key + "_v1",
                    formData.key + "isekf"
                ]
            });

            this.setState({
                selected: formData.key,
                formData: formData,
            });
        }
    }

    onSubmit(data) {
        console.log(data.formData)
    }

    render() {
        // if (this.state.schema == null) {
        //     return <div>Nothing to show</div>
        // }

        return (
            <Form
                schema={CMKeyRef}
                uiSchema={uiSchema}
                formData={this.state.formData}
                onSubmit={this.onSubmit.bind(this)}
                FieldTemplate={this.CustomFieldTemplate.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

const uiSchema = {
    "key": {
        "ui:autofocus": true,
        "ui:options": {
            backgroundColor: "yellow"
        }
    }
};