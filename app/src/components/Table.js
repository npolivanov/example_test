import React from "react";
import styled from "styled-components";
import store from "../store";
import axios from "axios";
import Users from "./Users";
import "bootstrap/dist/css/bootstrap.css";

const AppTable = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 900px;

    .line {
        width: 100%;
        display: flex;
        flex-direction: wrap;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-top: none;
    }
    .line span {
        max-width: 100%;
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .header_line_table {
        font-weight: bold;
        border: 1px solid #ccc;
        border-radius: 10px 10px 0px 0px;
    }
    .fullname {
        cursor: pointer;
    }
`;

class Table extends React.Component {
    constructor(psops) {
        super(psops);
        this.state = {
            items: psops.args,
            viewMore: 1,
            viewMoreText: "Посмотреть больше",
        };
    }

    axiosData() {
        const num = window.parseInt(store.getState().users.length);
        const _this = this;
        const imgLoader = (
            // eslint-disable-next-line jsx-a11y/img-has-alt
            <img src={require("../giphy.gif")} style={{ width: 40 }} />
        );
        // eslint-disable-next-line jsx-a11y/img-has-alt
        _this.setState({
            viewMoreText: imgLoader,
        });
        axios({
            method: "GET",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            url: "http://poliva0s.beget.tech/response.php?num=" + num,
        })
            .then(function(response) {
                const data = response.data;
                let result = [];
                // data to JSON format
                data.forEach(item => {
                    result.push(JSON.parse(item));
                });
                console.log(result);
                // add new data
                store.dispatch({
                    type: "ADD_ITEMS",
                    payload: result,
                });
                if (result.length < 3) {
                    _this.setState({ viewMore: 0 });
                }
                // change state items
                _this.setState({ items: result });
            })
            .catch(function(error) {
                alert("ошибка запроса");
            })
            .finally(function() {
                // state the after request
                _this.setState({ viewMoreText: "Посмотреть больше" });
            });
    }

    componentDidMount() {
        // load the first three users
        this.axiosData();
    }

    render() {
        // subscribe to change data
        store.subscribe(() => {
            this.setState({ items: store.getState().users });
        });
        // output all users
        const listItem = store.getState().users.map(function(item) {
            return <Users item={item} key={item.id} />;
        }, 0);

        // showing button loader
        const button = (
            <button
                onClick={this.axiosData.bind(this)}
                className="btn btn-primary"
            >
                {this.state.viewMoreText}
            </button>
        );

        return (
            <AppTable>
                <div className="line header_line_table">
                    <span>Ф.И.О</span>
                    <span>Телефон</span>
                    <span>Email</span>
                    <span>город проживания</span>
                    <span>кол-во не отключенных объектов</span>
                </div>
                {listItem}
                {this.state.viewMore ? button : ""}
            </AppTable>
        );
    }
}

export default Table;
