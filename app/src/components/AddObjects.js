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

export default class AddObjects extends React.Component {
    constructor(props) {
        super(props);
        this.user_id = props.user_id;
        this.item_id = props.item_id;
        this.state = {
            item: {
                type: "Авто",
                status: "Отключён",
                date_include: 0,
                date_diactive: 0,
            },
            servies: [],
            num_rows: 0,
        };
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
    addObjects() {
        const data = new FormData();
        data.append("id", this.user_id);
        data.append("type", this.state.item.type);
        data.append("status", this.state.item.status);
        data.append("date_include", this.state.item.date_include);
        data.append("date_diactive", this.state.item.date_diactive);

        const _this = this;

        axios
            .post("http://poliva0s.beget.tech/addObj.php", data)
            .then(function(response) {
                const data = response.data;
                let result = [];
                data.forEach(item => {
                    result.push(JSON.parse(item));
                });
                _this.props.addObjects(result);
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

        const servies = this.state.servies.map(item => {
            return (
                <li>
                    <div className="form-check form-check-inline">
                        <input
                            checked={item.active}
                            type="checkbox"
                            onChange={this.changeServes}
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
                    className="addObject btn btn-dark"
                    onClick={this.addObjects.bind(this)}
                >
                    + Добавить новый объект
                </button>
            </Ul>
        );
    }
}
