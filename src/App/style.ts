import styled from 'styled-components'

export const AppWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 8rem 1fr;
  grid-template-columns: min-content 1fr;
  grid-template-areas:
    'header header'
    'side content';
`

export const Header = styled.header`
  grid-area: header;
  background: lightcoral;
  padding: 1rem;
  display: flex;
  align-items: center;
`
