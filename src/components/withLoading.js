import React from "react"
import { css } from "@emotion/core";
import {ClipLoader} from "react-spinners"

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function WithLoading(Component, dataStore, fetchData) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                data: fetchData(),
                dataStore: dataStore,
            };

            this.handleChange=this.handleChange.bind(this)
        }

        componentDidMount() {
            dataStore.addChangeListener(this.handleChange)
        }

        componentWillUnmount() {
            dataStore.removeChangeListener(this.handleChange)
        }

        handleChange() {
            console.log('change')
            this.setState({
                data: fetchData()
            })
        }

        render() {
            console.log(this.state.data)
            if (this.state.data) return (
                <Component {...this.props} data={this.state.data}/>
            )

            return (
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        //size={"150px"} this also works
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }
    }
}

// function WithLoading(Component, callback) {
//     return function WithLoadingComponent({ isLoading, ...props}) {
//         if (!isLoading) return (
//             <Component {...props} />
//         )
//
//         return (
//             <div className="sweet-loading">
//                 <ClipLoader
//                     css={override}
//                     size={150}
//                     //size={"150px"} this also works
//                     color={"#123abc"}
//                     loading={this.state.loading}
//                 />
//             </div>
//         )
//     }
// }

export default WithLoading