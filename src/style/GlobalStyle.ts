import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {  
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {  
    font-family: 'Exo 2', sans-serif;
    font-size: 1.6rem;
    line-height: 1;
    box-sizing: border-box;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }
`
