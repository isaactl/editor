import React from 'react'

class Service extends React.Component {
    render() {
        return (
            <div>
                <h1>This is service</h1>
                <h2>{JSON.stringify(this.props.data)}</h2>
            </div>
        )
    }
}

export default Service