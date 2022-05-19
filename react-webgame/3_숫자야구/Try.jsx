import React, { Component} from "react";

class Try extends Component {
    render() {
        return (
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>


            // <li>
            //     <b>{this.props.value.fruit}</b> - {this.props.index}
            //     <div>Contents</div>
            //     <div>Contents1</div>
            //     <div>Contents2</div>
            //     <div>Contents3</div>
            // </li>
        )
    }
}

export default Try;