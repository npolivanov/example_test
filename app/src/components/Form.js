import React from "react";
import store from "../store";
import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Objects from './Objects';
import AddObjects from './AddObjects';

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
    constructor ( props ) {
        super(props);
        this.state = {
            item: props.items,
            obj: []
        };
       
        this.fullname = this.fullname.bind(this);
        this.phoneFun = this.phoneFun.bind(this);
        this.emailFun = this.emailFun.bind(this);
        this.cityFun = this.cityFun.bind(this);
    };
    fullname (event) {
        const items = this.state.item;
        items.fullname = event.target.value;    
        this.setState({item: items});
    };
    phoneFun (event) {
        const items = this.state.item;
        items.phone = event.target.value;    
        this.setState({item: items});
    };
    emailFun (event) {
        const items = this.state.item;
        items.email = event.target.value;    
        this.setState({item: items});
    };
    cityFun (event) {
        const items = this.state.item;
        items.city = event.target.value;    
        this.setState({item: items});
    };
    componentDidMount() {
        const data = new FormData();
        data.append("id", this.state.item.id);
        
        const _this = this;
        axios.post( "http://poliva0s.beget.tech/listobj.php", data)
        .then(function (response) {
            const data = response.data;
            const result  = [];
             // data to JSON format
            data.forEach((item) => {
                result.push(JSON.parse(item));
            });
            _this.setState({obj: result});
           
           
        })
        .catch(function (error) {
          return error;
        });
    };
    editorUser () {
        const data = new FormData();
        data.append("id", this.state.item.id);
        data.append("fullname", this.state.item.fullname);
        data.append("phone", this.state.item.phone);
        data.append("email", this.state.item.email);
        data.append("city", this.state.item.city);

        axios.post( "http://poliva0s.beget.tech/editorUsers.php", data)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });

        store.dispatch({
            type: "EDITOR_ITEMS",
            payload: {
                id: this.state.item.id,
                item: this.state.item
            }
        });

        // callback
        this.props.returnItems(this.state.item);
    };

    addObjects (item) {


        this.setState({ obj: this.state.obj.concat(item) });
       
    }
    render () {
        const listIObj =  this.state.obj.map( (item, i) => {
            return (
               <Objects key={i} items={item} />
             );
         }, 0);

        return(
         <AppForm>
            <div>
                <div className="input-group input_group_users">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Ф.И.О</span>
                    </div>
                    <input  type="text" className="form-control" value={this.state.item.fullname} onChange={this.fullname.bind(this)} />
                </div>

                <div className="input-group input_group_users">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Телефон</span>
                    </div>
                    <input  type="text" className="form-control" value={this.state.item.phone} onChange={this.phoneFun.bind(this)}/>
                </div>

                <div className="input-group input_group_users">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">email</span>
                    </div>
                    <input  type="text" className="form-control" value={this.state.item.email} onChange={this.emailFun.bind(this)}/>
                </div>

                <div className="input-group input_group_users">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">город проживания</span>
                    </div>
                    <input  type="text" className="form-control"  value={this.state.item.city} onChange={this.cityFun.bind(this)} />
                </div>

                <h2>List objects:</h2>
                <div className="list-group" id="list-tab" role="tablist">
                    {listIObj}
         
                   <AddObjects items={[]} addObjects={this.addObjects.bind(this)} user_id={this.state.item.id} item_id={this.state.obj.length} />
                </div>
            </div>

            <button className="btn btn-primary" onClick={this.editorUser.bind(this)}>Редактировать</button>
         </AppForm>
        );
    };
};