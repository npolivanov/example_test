import React, { Component } from 'react';
import Table from'./components/Table';
import styled from 'styled-components'
import Search from './components/Search'

const AppStyled = styled.div`
    width: 100%;
    height: 100vh;
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
          <Table args={[]} />
      </AppStyled>
    );
  }
}

export default App;

