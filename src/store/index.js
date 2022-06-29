import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import todos from './todos'


export const store = configureStore({
    reducer: {
        auth,
        todos

    },
  })

export default store