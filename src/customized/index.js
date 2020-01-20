import React from 'react';
import Swagger from './swagger.json';
import ValueFrom from './configMapKeyRef.json';
import Form from "react-jsonschema-form";
import SwaggerParser from 'swagger-parser';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            keyList: [],
            nameList: [],
            selectedKey: '',
            formData: {},
        };

        this._loadResources=this._loadResources.bind(this);
    }

    componentDidMount() {
        ValueFrom.properties.key = Object.assign(ValueFrom.properties.key, {
            "enum": [
                "soe",
                "oiieklw",
            ],
        });
        console.log(ValueFrom);
        this.setState({schema: ValueFrom})
        // this._loadResources()
    }

    // load configmap / secret list from k8s cluster
    _loadResources() {
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
        // console.log(formData);
        if (this.state.selectedKey !== formData.key) {
            formData.name = "";
            // assign name list, TODO: load from k8s
            const nameList = [
                formData.key + "_v1",
                formData.key + "isekf"
            ];
            ValueFrom.properties.name = Object.assign(ValueFrom.properties.name, {
                "enum": nameList,
            });

            this.setState({
                selectedKey: formData.key,
                nameList: nameList,
                formData: formData,
            });
        } else {
            this.setState({
                formData: formData
            })
        }
    }

    onSubmit(data) {
        console.log(data.formData)
    }

    render() {
        if (this.state.schema == null) {
            return <div>Nothing to show</div>
        }

        return (
            <Form
                schema={this.state.schema}
                formData={this.state.formData}
                onSubmit={this.onSubmit.bind(this)}
                FieldTemplate={this.CustomFieldTemplate.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
