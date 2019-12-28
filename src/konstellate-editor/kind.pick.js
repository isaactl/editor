import React from 'react';
import './kind.pick.css';
import axios from 'axios'
import SwaggerParser from 'swagger-parser';

class KindPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    loadData = () => {
        var api = 'https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json';
        axios.get(api).then((response) => {
            let d = response.data.definitions
            SwaggerParser.validate(response.data, (err, api) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                    // console.log(api.definitions["io.k8s.api.apps.v1.Deployment"])

                    console.log(JSON.stringify(api.definitions["io.k8s.api.apps.v1.Deployment"]))
                }
            });

            this.setState({ data: d })
        }).catch(function (err) {
            console.log(err)
        })


    }
    render() {
        if (this.state.data == null) {
            this.loadData()
        }
        return (
            <div className='kind-picker-container'>
                <h1>I'm KindPicker!</h1>
            </div>

        )
    }
}

export default KindPicker;