import { configureStore } from '@reduxjs/toolkit'
import { UserState, userReducer } from './container/user'
import { AssetState, assetReducer } from './container/asset'

export const store = configureStore({
    reducer: {
        user: userReducer,
        asset: assetReducer
    },
})

export interface IRoot {
    user: UserState,
    asset: AssetState
} 