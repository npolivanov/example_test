import React from "react";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import store from "../store";

const AppForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .input_group_users {
        max-width: 100%;
        width: 800px;
        padding-top: 20px;
    }
`;
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            phone: "",
            email: "",
            city: "",
        };
        this.fullname = this.fullname.bind(this);
        this.phoneFun = this.phoneFun.bind(this);
        this.emailFun = this.emailFun.bind(this);
        this.cityFun = this.cityFun.bind(this);
    }
    fullname(event) {
        this.setState({ fullname: event.target.value });
    }
    phoneFun(event) {
        this.setState({ phone: event.target.value });
    }
    emailFun(event) {
        this.setState({ email: event.target.value });
    }
    cityFun(event) {
        this.setState({ city: event.target.value });
    }
    editorUser() {
        const data = new FormData();
        data.append("id", this.state.id);
        data.append("fullname", this.state.fullname);
        data.append("phone", this.state.phone);
        data.append("email", this.state.email);
        data.append("city", this.state.city);
        // add new data
        store.dispatch({
            type: "ADD_ITEMS",
            payload: this.state,
        });
        axios
            .post("http://poliva0s.beget.tech/add.php", data)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                return error;
            });
    }

    render() {
        return (
            <AppForm>
                <div>
                    <div className="input-group input_group_users">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                Ф.И.О
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.fullname}
                            onChange={this.fullname.bind(this)}
                        />
                    </div>

                    <div className="input-group input_group_users">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                Телефон
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.phoneFun.bind(this)}
                        />
                    </div>

                    <div className="input-group input_group_users">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                email
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.emailFun.bind(this)}
                        />
                    </div>

                    <div className="input-group input_group_users">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                город проживания
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.city}
                            onChange={this.cityFun.bind(this)}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this.editorUser.bind(this)}
                >
                    Добавить
                </button>
            </AppForm>
        );
    }
}
