import React  from 'react'
import styled from 'styled-components'
import store from '../store'
import axios from 'axios'
import Users from './Users'
import 'bootstrap/dist/css/bootstrap.css';


const AppTable = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 900px;
    
    .line{
        width: 100%;
        display: flex;
        flex-direction: wrap;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        box-sizing: border-box;
        border: 1px solid #ccc; 
        border-top: none;
    }
    .line span {
        max-width: 100%;
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .header_line_table {
        font-weight: bold;
        border: 1px solid #ccc; 
        border-radius: 10px 10px 0px 0px;
    }
    .fullname {
        cursor: pointer;
    }
`

class Table extends React.Component {
    constructor (psops) {
        super(psops);
        this.state = {
            items: psops.args,
        };
    }
    axiosData () {
        let num = parseInt(store.getState().users.length);
        let _this = this;
        axios( {
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url:"http://poliva0s.beget.tech/response.php?num="+ num
          })
                .then(function (response) {
                    let data = response.data;
                    let result  = [];
                    data.forEach((item) => {
                        result.push(JSON.parse(item));
                    });
                    
                    store.dispatch({
                        type: 'ADD_ITEMS',
                        payload: result
                      });
                 
                      _this.setState({items:  result });

                })
                .catch(function (error) {
                         console.log(error);
                });
              
    }
    componentDidMount() {
        this.axiosData();
    }
   render() {
             store.subscribe(() => {
                 this.setState({items: store.getState().users});
            })

             let listItem =  store.getState().users.map(function (item) {
                    return <Users item={item} key={item.id} />
            }, 0);
        return (
            <AppTable>
                <div className="line header_line_table">
                    <span>
                        Ф.И.О
                    </span>
                        <span>
                        Телефон
                        </span>
                    <span>
                        Email
                        </span>
                        <span>
                        город проживания
                        </span>
                    <span>
                        кол-во не отключенных объектов
                    </span>
                </div>
                { listItem}
                
                <button onClick={this.axiosData.bind(this)} className="btn btn-primary">Посмотреть больше</button>
            </AppTable>
        ) 
   }  
}
export default Table;