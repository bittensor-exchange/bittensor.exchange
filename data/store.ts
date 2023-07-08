import { configureStore } from '@reduxjs/toolkit'
import { UserState, userReducer } from './container/user'
import { KeyDataState, keyReducer } from './container/keyData'

export const store = configureStore({
    reducer: {
        user: userReducer,
        key: keyReducer
    },
})

export interface IRoot {
    user: UserState,
    key: KeyDataState
} 