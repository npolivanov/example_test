import React from "react";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field } from "formik";

const ServiesComponent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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

export default class AddServies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
        };
    }
    render() {
        return (
            <ServiesComponent>
                <Formik
                    onSubmit={values => {
                        const data = new FormData();
                        data.append("id", this.state.id);
                        if (values.select_active === undefined) {
                            data.append("active", values.active);
                        } else {
                            data.append("active", values.select_active);
                        }
                        data.append("title", values.title);
                        data.append("date", values.date);

                        const _this = this;
                        axios
                            .post(
                                "http://poliva0s.beget.tech/addServies.php",
                                data
                            )
                            .then(function(response) {
                                const data = response.data;
                                let result = [];
                                // data to JSON format
                                data.forEach(item => {
                                    result.push(JSON.parse(item));
                                });

                                _this.props.updateServieses(result);
                            })
                            .catch(function(error) {
                                return error;
                            });
                    }}
                    initialValues={{
                        active: "active",
                        title: "",
                        date: "",
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string()
                            .min(3)
                            .required("Required"),
                        date: Yup.date().required("Required"),
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
                                        className="btn btn-dark"
                                    >
                                        добавить
                                    </button>
                                </div>
                                {errors.title || errors.date ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.title || errors.date}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </form>
                        );
                    }}
                </Formik>
            </ServiesComponent>
        );
    }
}
