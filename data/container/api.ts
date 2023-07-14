import { createSlice } from "@reduxjs/toolkit"

export interface ApiState {
    openOrders: number;
    orderHistory: number;
    tradeHistory: number;
}

const initialState: ApiState = {
    openOrders: 0,
    orderHistory: 0,
    tradeHistory: 0,
}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
      updateOpenOrders(state) {
        state.openOrders ++;
      }
    },
})

export const { updateOpenOrders } = apiSlice.actions

export const apiReducer = apiSlice.reducer