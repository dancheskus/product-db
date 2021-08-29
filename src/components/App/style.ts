import styled from 'styled-components'

export const AppWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 8rem 1fr;
  grid-template-columns: 35rem 1fr;
  grid-template-areas:
    'header header'
    'side content';
`

export const Header = styled.header`
  grid-area: header;
  background: #496fd6;
  color: white;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`
