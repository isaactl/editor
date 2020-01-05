import React, {Component} from "react";
import Form from 'react-jsonschema-form';
import SwaggerParser from "swagger-parser";

const log = (type) => console.log.bind(console, type);

class Env extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schema: null,
        }
    }

    componentDidMount() {
        SwaggerParser.validate(this.props.schema, (err, api) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                // console.log(api.definitions["io.k8s.api.apps.v1.Deployment"])
                console.log(JSON.stringify(api.definitions["io.k8s.api.apps.v1.Deployment"]))
                // let schema = api.definitions["io.k8s.api.apps.v1.Deployment"];

                this.setState({schema: api.definitions["io.k8s.api.apps.v1.Deployment"]});
            }
        });
    }

    // https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#field-template
    render() {
        if (this.state.schema == null)
            return null;

        //console.log(this.state.schema.properties.spec.properties.template.properties.spec.properties.containers)
        return (
            <Form schema={this.state.schema.properties.spec.properties.template.properties.spec.properties.containers.items.properties.env}
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")} />
        )
    }
}

export default Env