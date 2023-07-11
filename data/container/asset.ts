import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { IRoot } from "@/data/store";

interface Asset {
    id: number;
    name: string;
    network: string;
    deposit_address: string;
    balance: number;
    order_balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AssetState {
    assets: Asset[],
    loading: boolean,
    maxLimitError: boolean
}

const initialState: AssetState = {
    assets: [],
    loading: false,
    maxLimitError: false
}

export const fetchAsset = createAsyncThunk(
    'asset/fetchAsset',
    async () => {
        const assets = (await axios.get("/api/assets/all")) as Asset[];
        return assets;
    }
)

export const withdrawAsset = createAsyncThunk<Asset | string, { name: string }>(
    'asset/withdrawAsset',
    async ({ name }) => {
        try {
            const asset = (await axios.post(URL + "/profile/asset", {
                name: name
            }, {
                headers: {
                    Authorization: localStorage.getItem("auth"),
                },
            })).data as Asset;
            return asset;
        } catch (err) {
            const message = (err as AxiosError<{ message: string }, any>).response?.data?.message;
            if (message?.toLocaleLowerCase().includes("maximum")) {
                return "maximum";
            }
            return "";
        }
    }
)


export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsset.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAsset.fulfilled, (state, action) => {
                state.assets = action.payload
                state.loading = false;
            })
            .addCase(fetchAsset.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(withdrawAsset.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(withdrawAsset.fulfilled, (state, action) => {
                console.log((typeof action.payload) === "string");
                if (typeof action.payload === "string") {
                    state.maxLimitError = true;
                    document.getElementsByTagName("body")[0].classList.add("active-overlay");
                } else {
                    state.assets.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(withdrawAsset.rejected, (state, action) => {
                state.loading = false;
            })
    },
})

export const {  } = assetSlice.actions

export const assetReducer = assetSlice.reducer