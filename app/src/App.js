import React, { Component } from 'react';
import Table from'./components/Table';
import styled from 'styled-components'
import Search from './components/Search'
import Add from './components/Add'

const AppStyled = styled.div`
    max-width: 100%;
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

class App extends Component {
  render() {
    return (
      <AppStyled>
          <Search />
          <Add />
          <Table />
      </AppStyled>
    );
  }
}

export default App;

