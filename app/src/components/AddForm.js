import React from "react";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import store from "../store";
import * as Yup from "yup";
import { Formik } from "formik";

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
    render() {
        return (
            <AppForm>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {
                        const data = new FormData();
                        const new_user = {
                            fullname: values.fullname,
                            phone: values.phone,
                            email: values.email,
                            city: values.city,
                        };
                        // add new data
                        store.dispatch({
                            type: "ADD_ITEMS",
                            payload: new_user,
                        });
                        data.append("fullname", values.fullname);
                        data.append("phone", values.phone);
                        data.append("email", values.email);
                        data.append("city", values.city);

                        axios
                            .post(
                                "http://poliva0s.beget.tech/editorUsers.php",
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
                        fullname: "",
                        phone: "",
                        email: "",
                        city: "",
                    }}
                    validationSchema={Yup.object().shape({
                        fullname: Yup.string()
                            .min(3)
                            .max(100)
                            .required("Required"),
                        phone: Yup.number()
                            .min(4)
                            .required("Required"),
                        email: Yup.string()
                            .email()
                            .required("Required"),
                        city: Yup.string()
                            .min(2)
                            .default(() => "Saratov"),
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
                                        id="fullname"
                                        type="text"
                                        className={
                                            errors.fullname
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={values.fullname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.fullname ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.fullname}
                                    </p>
                                ) : (
                                    ""
                                )}
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
                                        id="phone"
                                        type="text"
                                        className={
                                            errors.phone
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={values.phone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.phone ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.phone}
                                    </p>
                                ) : (
                                    ""
                                )}
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
                                        id="email"
                                        type="text"
                                        className={
                                            errors.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.email}
                                    </p>
                                ) : (
                                    ""
                                )}
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
                                        id="city"
                                        type="text"
                                        className={
                                            errors.city
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={values.city}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.city ? (
                                    <p
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {errors.city}
                                    </p>
                                ) : (
                                    ""
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Редактировать
                                </button>
                            </form>
                        );
                    }}
                </Formik>
            </AppForm>
        );
    }
}
