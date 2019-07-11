import React from "react";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Objects from "./Objects";
import AddObjects from "./AddObjects";
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
    .addObject {
        align-self: flex-start;
    }
`;

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.items,
            obj: [],
        };
    }
    componentDidMount() {
        const data = new FormData();
        data.append("id", this.state.item.id);

        const _this = this;
        axios
            .post("http://poliva0s.beget.tech/listobj.php", data)
            .then(function(response) {
                const data = response.data;
                const result = [];
                // data to JSON format
                data.forEach(item => {
                    result.push(JSON.parse(item));
                });
                _this.setState({ obj: result });
            })
            .catch(function(error) {
                return error;
            });
    }

    addObjects(item) {
        let objects = this.state.obj;
        objects = objects.concat(item);
        this.setState({ obj: objects });
    }

    render() {
        const listIObj = this.state.obj.map((item, i) => {
            return <Objects key={i} items={item} />;
        }, 0);

        return (
            <AppForm>
                <div>
                    <Formik
                        onSubmit={(values, { setSubmitting }) => {
                            const data = new FormData();
                            data.append("id", this.state.item.id);
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

                            // callback
                            this.props.returnItems({
                                fullname: values.fullname,
                                phone: values.phone,
                                email: values.email,
                                city: values.city,
                                5: this.state.item[5],
                            });
                        }}
                        initialValues={{
                            fullname: this.state.item.fullname,
                            phone: this.state.item.phone,
                            email: this.state.item.email,
                            city: this.state.item.city,
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

                    <h2>List objects:</h2>
                    <div className="list-group" id="list-tab" role="tablist">
                        {listIObj}

                        <AddObjects
                            items={[]}
                            addObjects={this.addObjects.bind(this)}
                            user_id={this.state.item.id}
                            item_id={this.state.obj.length}
                        />
                    </div>
                </div>
            </AppForm>
        );
    }
}
