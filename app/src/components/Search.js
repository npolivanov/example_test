import React from "react";
import styled from "styled-components";
import store from "../store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import { Formik } from "formik";

const Label = styled.label`
    max-width: 100%;
    display: flex;

    input {
        max-width: 100%;
        width: 500px;
    }
`;

const SearchComponent = () => (
    <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, { setSubmitting }) => {
            axios({
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                url:
                    "http://poliva0s.beget.tech/search.php?value=" +
                    values.search,
            })
                .then(function(response) {
                    const data = response.data;
                    if (data.length > 0) {
                        const result = [];
                        data.forEach(item => {
                            result.push(JSON.parse(item));
                        });
                        store.dispatch({
                            type: "SEARCH_ITEMS",
                            payload: result,
                        });
                    } else {
                        alert("Такого результата нет ");
                    }
                })
                .catch(function(error) {
                    alert("ошибка запроса " + error);
                });
        }}
        validationSchema={Yup.object().shape({
            search: Yup.string()
                .min(3)
                .max(100)
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
                // eslint-disable-next-line no-unused-expressions
                <form onSubmit={handleSubmit}>
                    <Label>
                        <input
                            id="search"
                            className="form-control"
                            type="text"
                            placeholder="search"
                            value={values.search}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            className={
                                errors.search
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        />
                        <button type="submit" className="btn btn-info">
                            Поиск
                        </button>
                    </Label>
                    {errors.search ? (
                        <p className="alert alert-danger" role="alert">
                            {errors.search}
                        </p>
                    ) : (
                        ""
                    )}
                </form>
            );
        }}
    </Formik>
);

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = { value: "" };
        // this.valueChange = this.valueChange.bind(this);
    }

    valueChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return <SearchComponent />;
    }
}
