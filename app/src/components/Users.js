import React, { useState, useEffect }  from 'react'
import Form from './Form';

class  Users extends React.Component  {
    constructor (props) {
        super(props);
        this.state = {
            viewForm: false,
            item: props.item
        };
    }
    viewFormSingle (id) {
        let viewForm = !this.state.viewForm;
        this.setState({viewForm});
        
        console.log(this.state.viewForm);
    }
    returnItems (item) {
        this.setState({item: item});
    }
    render () {
        let form;
 
        if(this.state.viewForm) {
            form =  <Form returnItems={this.returnItems.bind(this)} items={this.state.item}/>
        } else {
            form =  ""
        }
        return <div>
            {form}
             <div className="line" key={this.state.item.id} >
            <span  className="fullname" onClick={this.viewFormSingle.bind(this, this.state.item)}>
            {this.state.item.fullname}
            </span>
            <span>
                {this.state.item.phone}
                </span>
            <span>
                {this.state.item.email}
                </span>
            <span>
                {this.state.item.city}
                </span>
            <span>
                {this.state.item.obj}
            </span>
        </div>
        </div>   
        }
     }

     export default Users;