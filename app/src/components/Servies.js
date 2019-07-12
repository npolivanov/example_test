import React from "react";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field } from "formik";

const ServiesComponent = styled.div`
    form {
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    form div {
        padding: 10px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default class Servies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servies: props.servies,
        };
    }
    render() {
        return (
            <ServiesComponent>
                <li>
                    <Formik
                        onSubmit={values => {
                            const data = new FormData();
                            data.append("id", this.state.servies.id);
                            if (values.select_active === undefined) {
                                data.append(
                                    "active",
                                    this.state.servies.active
                                );
                            } else {
                                data.append("active", values.select_active);
                            }

                            data.append("title", values.title);
                            data.append("date", values.date);

                            axios
                                .post(
                                    "http://poliva0s.beget.tech/updateServies.php",
                                    data
                                )
                                .then(function(response) {
                                    return response.data;
                                })
                                .catch(function(error) {
                                    return error;
                                });
                        }}
                        initialValues={{
                            acive: this.state.servies.active,
                            title: this.state.servies.title,
                            date: this.state.servies.date,
                        }}
                        validationSchema={Yup.object().shape({
                            title: Yup.string()
                                .min(3)
                                .required("Required"),
                        })}
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
                                    <div>
                                        <label className="form-check-label">
                                            <Field
                                                component="select"
                                                name="select_active"
                                                defaultValue={values.acive}
                                                className="form-control"
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value="acitve"
                                                    id="select_active1"
                                                >
                                                    Активна
                                                </option>
                                                <option
                                                    value="no-acitve"
                                                    id="select_active2"
                                                >
                                                    Не активна
                                                </option>
                                            </Field>
                                        </label>
                                        <label className="form-check-label">
                                            <input
                                                id="title"
                                                type="text"
                                                value={values.title}
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label className="form-check-label">
                                            <input
                                                id="date"
                                                type="date"
                                                value={values.date}
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <button
                                            type="submit"
                                            className="btn btn-info"
                                        >
                                            Обновить
                                        </button>
                                    </div>
                                    {errors.title ? (
                                        <p
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {errors.title}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </form>
                            );
                        }}
                    </Formik>
                </li>
            </ServiesComponent>
        );
    }
}
