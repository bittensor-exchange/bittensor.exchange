import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

interface Pair {
    id: number;
    name: string;
    token1: string;
    token2: string;
    high: number;
    low: number;
    volume: number;
    change: number;
    quote_price: number;
    loading: boolean;
}

interface Trade {
    id: number;
    takerAction: string;
    price: number;
    loading: boolean;
}

export interface PairState {
    pairs: Pair[],
    currentPair: Pair,
    lastTrade: Trade,
    loading: boolean,
    maxLimitError: boolean
}

const initialState: PairState = {
    pairs: [],
    currentPair: {
        id: 0,
        name: "TAO/BTC",
        token1: "TAO",
        token2: "BTC",
        high: undefined,
        low: undefined,
        volume: undefined,
        change: undefined,
        quote_price: 0,
        loading: false
    },
    lastTrade: {
        id: 0,
        takerAction: "buy",
        price: 0,
        loading: false
    },
    loading: false,
    maxLimitError: false
}

export const fetchPair = createAsyncThunk(
    'pair/fetchPair',
    async () => {
        const pairs = (await axios.get("/api/pairs/all")) as Pair[];
        return pairs;
    }
)

export const fetchCurrentPair = createAsyncThunk(
    'pair/fetchCurrentPair',
    async () => {
        const pair = (await axios.get("/api/pairs/TAO_BTC")) as Pair;
        return pair;
    }
)



export const fetchLastTrade = createAsyncThunk(
    'trade/lastTrade',
    async (pairName: string) => {
        const lastTrade = (await axios.get(`/api/trades/last/${pairName.replace('/', '_')}`)) as Trade;
        return lastTrade;
    }
)

export const pairSlice = createSlice({
    name: 'pair',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPair.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchPair.fulfilled, (state, action) => {
                state.pairs = action.payload
                state.loading = false;
            })
            .addCase(fetchPair.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchLastTrade.pending, (state, action) => {
                state.lastTrade.loading = true;
            })
            .addCase(fetchLastTrade.fulfilled, (state, action) => {
                if(!action.payload) return;
                state.lastTrade = action.payload;
                state.lastTrade.loading = false;
            })
            .addCase(fetchLastTrade.rejected, (state, action) => {
                state.lastTrade.loading = false;
            })
            .addCase(fetchCurrentPair.pending, (state, action) => {
                state.currentPair.loading = true;
            })
            .addCase(fetchCurrentPair.fulfilled, (state, action) => {
                Object.assign(state.currentPair, action.payload);
                state.lastTrade.loading = false;
            })
            .addCase(fetchCurrentPair.rejected, (state, action) => {
                state.currentPair.loading = false;
            })
    },
})

export const {  } = pairSlice.actions

export const pairReducer = pairSlice.reducer