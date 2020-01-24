import React from "react";
import { css } from "@emotion/core";
// First way to import
import { ClipLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
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
        );
    }
}

export default AwesomeComponent