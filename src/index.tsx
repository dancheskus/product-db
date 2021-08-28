import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'redux/store'
import GlobalStyle from 'style/GlobalStyle'

import App from './App'

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />

    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
