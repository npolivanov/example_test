import React from "react";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    button {
        align-self: flex-end;
        margin-top: 10px;
    }

    div {
        display: flex;
    }
    width: 100%;
`;

export default class Objects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.items,
            servies: [],
        };
        this.changeServes = this.changeServes.bind(this);
        this.inputBefore = this.inputBefore.bind(this);
        this.inputAfter = this.inputAfter.bind(this);
        this.selectType = this.selectType.bind(this);
        this.selectStatus = this.selectStatus.bind(this);
        this.status = ["Действует", "Ожидает оплаты", "Отключён"];
        this.type = ["Недвижимость", "Авто"];
    }
    componentDidMount() {
        const data = new FormData();
        data.append("id", this.state.item.id);

        const _this = this;
        axios
            .post("http://poliva0s.beget.tech/serv.php", data)
            .then(function(response) {
                const data = response.data;
                const result = [];
                // data to JSON format
                data.forEach(item => {
                    result.push(JSON.parse(item));
                });

                _this.setState({ servies: result });
            })
            .catch(function(error) {
                return error;
            });
    }

    inputAfter(event) {
        const items = this.state.item;
        items.date_include = event.target.value;
        this.setState({ item: items });
    }
    inputBefore(event) {
        const items = this.state.item;
        items.date_diactive = event.target.value;
        this.setState({ item: items });
    }
    selectType(event) {
        const items = this.state.item;
        items.type = event.target.value;
        this.setState({ item: items });
    }
    selectStatus(event) {
        const items = this.state.item;
        items.status = event.target.value;
        this.setState({ item: items });
    }

    changeServes(index) {
        const servies = this.state.servies;
        servies[index].active = servies[index].active ? "" : "активна";
        this.setState({ servies });
    }

    updateFun() {
        const data = new FormData();
        data.append("id", this.state.item.id);
        data.append("type", this.state.item.type);
        data.append("status", this.state.item.status);
        data.append("date_include", this.state.item.date_include);
        data.append("date_diactive", this.state.item.date_diactive);

        axios
            .post("http://poliva0s.beget.tech/updateObj.php", data)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error;
            });
    }

    render() {
        const status_item = this.status.map((item, i) => {
            return (
                <option value={item} key={i}>
                    {item}
                </option>
            );
        });

        const type_item = this.type.map((item, i) => {
            return (
                <option value={item} key={i}>
                    {item}
                </option>
            );
        });

        const servies = this.state.servies.map((item, i) => {
            return (
                <li key={item.id}>
                    <div className="form-check form-check-inline">
                        <input
                            checked={item.active}
                            type="checkbox"
                            onChange={this.changeServes.bind(this, i)}
                        />
                        <label className="form-check-label">
                            {item.title} дата: {item.date}
                        </label>
                    </div>
                </li>
            );
        });

        return (
            <Ul className="list-group-item list-group-item-action">
                <div>
                    <div className="form-group col-md-4">
                        <select
                            id="inputState"
                            className="form-control"
                            onChange={this.selectType}
                            value={this.state.item.type}
                        >
                            {type_item}
                        </select>
                    </div>
                    <input
                        value={this.state.item.date_include}
                        onChange={this.inputAfter}
                        className="form-control"
                    />
                    <input
                        value={this.state.item.date_diactive}
                        onChange={this.inputBefore}
                        className="form-control"
                    />
                    <div className="form-group col-md-4">
                        <select
                            className="form-control"
                            onChange={this.selectStatus}
                            value={this.state.item.status}
                        >
                            {status_item}
                        </select>
                    </div>
                </div>
                <ol>
                    Услуги:
                    {servies}
                </ol>
                <button
                    className="btn btn-success"
                    onClick={this.updateFun.bind(this)}
                >
                    Обновить объект
                </button>
            </Ul>
        );
    }
}
