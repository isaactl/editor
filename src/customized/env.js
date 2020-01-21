import React from 'react';
import Env from './env.json';
import Form from "react-jsonschema-form";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            schema: Env,
            keyList: [],
            nameList: [],
            selectedKey: '',
            formData: [
                {
                    "name": "SERVICE_ID",
                    "value": "foundation_metadata"
                },
                {
                    "name": "SERVICE_SECRET",
                    "valueFrom": {
                        "secretKeyRef": {
                            "name": "my-secret",
                            "key": "FoundationService"
                        }
                    }
                }
            ],
        };
    }

    componentDidMount() {
    }

    CustomFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props;
        return (
            <div className={classNames}>
                <label htmlFor={id+label}>{label}{required ? "*" : null}</label>
                {help}
                {children}
                {errors}
                {description}
            </div>
        );
    }

    // https://jsfiddle.net/69z2wepo/68259/
    handleChange(data) {
        const formData = JSON.parse(JSON.stringify(data.formData));
        // console.log(JSON.stringify(data.formData));
        if (this.state.selectedKey !== formData.key) {
            formData.name = "";
            // assign name list, TODO: load from k8s
            const nameList = [
                formData.key + "_v1",
                formData.key + "isekf"
            ];
            // ValueFrom.properties.name = Object.assign(ValueFrom.properties.name, {
            //     "enum": nameList,
            // });

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
        return (
            <Form
                schema={this.state.schema}
                formData={this.state.formData}
                onSubmit={this.onSubmit.bind(this)}
                // FieldTemplate={this.CustomFieldTemplate.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
