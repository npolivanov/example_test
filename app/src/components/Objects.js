import React from "react";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import { Formik, Field } from "formik";

const Ul = styled.ul`
    form .item {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        input {
            max-width: 100%;
            width: 800px;
            margin: 10px;
        }
        select {
            max-width: 100%;
            width: 800px;
            margin: 10px;
        }
    }
    form button {
        display: block;
        margin: auto;
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
                <Formik
                    initialValues={{
                        type: this.state.item.type,
                        date_include: this.state.item.date_include,
                        date_diactive: this.state.item.date_diactive,
                        status: this.state.item.status,
                    }}
                    validationSchema={Yup.object().shape({
                        date_include: Yup.date().required("Required"),
                        date_diactive: Yup.date().required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        const data = new FormData();
                        data.append("id", this.state.item.id);
                        if (values.select_type === undefined) {
                            data.append("type", values.type);
                        } else {
                            data.append("type", values.select_type);
                        }

                        if (values.select_status === undefined) {
                            data.append("status", values.status);
                        } else {
                            data.append("status", values.select_status);
                        }

                        data.append("date_include", values.date_include);
                        data.append("date_diactive", values.date_diactive);

                        axios
                            .post(
                                "http://poliva0s.beget.tech/updateObj.php",
                                data
                            )
                            .then(function(response) {
                                return response.data;
                            })
                            .catch(function(error) {
                                return error;
                            });
                    }}
                >
                    {props => {
                        const {
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="item">
                                    <div className="form-group">
                                        <Field
                                            component="select"
                                            defaultValue={values.type}
                                            name="select_type"
                                            className="form-control"
                                            onChange={handleChange}
                                        >
                                            <option
                                                value="Недвижимость"
                                                id="select_type1"
                                            >
                                                Недвижимость
                                            </option>
                                            <option
                                                value="Авто"
                                                id="select_type2"
                                            >
                                                Авто
                                            </option>
                                        </Field>
                                    </div>
                                    <input
                                        id="date_include"
                                        type="date"
                                        value={values.date_include}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                    />
                                    <input
                                        id="date_diactive"
                                        type="date"
                                        value={values.date_diactive}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                    />
                                    <div className="form-group">
                                        <Field
                                            defaultValue={values.status}
                                            component="select"
                                            className="form-control"
                                            onChange={handleChange}
                                            name="select_status"
                                        >
                                            <option value="Действует">
                                                Действует
                                            </option>
                                            <option value="Ожидает оплаты">
                                                Ожидает оплаты
                                            </option>
                                            <option value="Отключён">
                                                Отключён
                                            </option>
                                        </Field>
                                    </div>
                                </div>
                                {errors.date_include ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.date_include}
                                    </p>
                                ) : (
                                    ""
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Обновить объект
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                <ol>
                    Услуги:
                    {servies}
                </ol>
            </Ul>
        );
    }
}
