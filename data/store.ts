import { configureStore } from '@reduxjs/toolkit'
import { UserState, userReducer } from './container/user'
import { AssetState, assetReducer } from './container/asset'
import { ApiState, apiReducer } from './container/api'
import { PairState, pairReducer } from './container/pair'
import { ConfigState, configReducer } from './container/config'

export const store = configureStore({
    reducer: {
        user: userReducer,
        asset: assetReducer,
        api: apiReducer,
        pair: pairReducer,
        config: configReducer
    },
})

export interface IRoot {
    user: UserState,
    asset: AssetState,
    api: ApiState,
    pair: PairState,
    config: ConfigState
} 