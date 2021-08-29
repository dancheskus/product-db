import { configureStore } from '@reduxjs/toolkit'

import appDataReducer from './products'

export const store = configureStore({ reducer: { appData: appDataReducer } })

store.subscribe(() => {
  localStorage.setItem('savedData', JSON.stringify(store.getState().appData))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
