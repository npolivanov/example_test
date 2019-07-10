import React from "react";
import styled from "styled-components";
import store from "../store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Label = styled.label`
     max-width: 100%;
     display: flex;

    input {
        max-width: 100%;
        width: 500px;
    }
`;

export default class Search extends  React.Component {
    constructor() {
        super();
        this.state = {value: ""};
        this.valueChange = this.valueChange.bind(this);
    };

    valueChange(event) {
        this.setState({value: event.target.value});
    };

    SearchUsers () {
        if(this.state.value === "") {
            alert("Пожалуйста, введите текст");
        };
        axios( {
            method: "GET",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            url:"http://poliva0s.beget.tech/search.php?value="+ this.state.value
          })
         .then(function (response) {
            const data = response.data;
            if( response.data.length > 0 ) {
                const result  = [];
                data.forEach((item) => {
                    result.push(JSON.parse(item));
                });
                store.dispatch({
                    type: "SEARCH_ITEMS",
                    payload: result
                });
            }else {
                alert("Такого результата нет " );
            };
         })
         .catch(function (error) {
            alert("ошибка запроса");
         });
     };
    render() {
        return <Label>
             <input className="form-control"   type="search" placeholder="search" value={this.state.value} onChange={this.valueChange} />
             <button  className="btn btn-info" onClick={this.SearchUsers.bind(this)}>Поиск</button>
            </Label>
    };
};