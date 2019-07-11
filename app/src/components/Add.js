import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./AddForm";

const Button = styled.button`
    align-self: flex-start;
`;

export default class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            mark: "+",
        };
    }
    changeActive() {
        this.setState({ active: !this.state.active });
        this.setState({ mark: this.state.active ? "+" : "-" });
    }
    render() {
        return (
            <div>
                {this.state.active ? <Form /> : ""}
                <Button
                    className="btn btn-dark"
                    onClick={this.changeActive.bind(this)}
                >
                    {this.state.mark}
                </Button>
            </div>
        );
    }
}
