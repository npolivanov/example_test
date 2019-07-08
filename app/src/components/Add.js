import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import  Form from './AddForm';


const Button = styled.button`
    align-self: flex-start;
`

export default class Add extends React.Component {
    constructor () {
        super();
        this.state = {
            active: false,
            mark: "+"
        };
    }
    changeActive() {
        console.log(1, this);
       this.setState({active: !this.state.active});
       this.setState({mark: this.state.active ? "+" : "-" });
    }
    render() {
        let form;
        if(this.state.active === true) {
            form = <Form />
        }else {
            form = ""
        };
        return <div>
            {form}
            <Button className="btn btn-dark" onClick={this.changeActive.bind(this)}>{this.state.mark}</Button>
        </div>
    }
}