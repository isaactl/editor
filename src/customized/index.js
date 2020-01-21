import React from 'react';
import Swagger from './swagger.json';
import Env from './env';
import SwaggerParser from 'swagger-parser';

// load all schemas of kubernetes v1.14.9
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schemas: null,
        };

        this._loadSwagger=this._loadSwagger.bind(this);
    }

    componentDidMount() {
        this._loadSwagger()
    }

    // load config map / secret list from k8s cluster
    _loadSwagger() {
        SwaggerParser.validate(Swagger, (err, api) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                // console.log(api.definitions["io.k8s.api.apps.v1.Deployment"])
                // console.log(JSON.stringify(api.definitions["io.k8s.api.apps.v1.Deployment"]))
                // let schema = api.definitions["io.k8s.api.apps.v1.Deployment"];

                this.setState({schemas: api.definitions});
            }
        });
    }

    render() {
        return (
            <Env />
        )
    }
}
