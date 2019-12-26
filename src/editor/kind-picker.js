import React from 'react'
import axios from 'axios'
import './kind-picker.css'

class KindPicker extends React.Component {
    constructor(props) {
        this.state = {
            data: []
        }
    }

    loadData = () => {
        var api = 'https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json';
        axios.get(api).then((response) => {
            let d = response.data.definitions
            console.log(d)
            
            this.setState({data: d})
        }).catch(function (err) {
            console.log(err)
        })
    }

    render() {
        this.loadData()

        return (
            <div className='kind-picker-container'>
                <h1>Kind Picker</h1>
            </div>
        )
    }
}

export default KindPicker