import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { IRoot } from "@/data/store";

interface KeyData {
    createdAt: string;
    credits: number;
    id: number;
    key: string;
    lastUsedAt: string;
    name: string;
    plan: string;
    show: boolean;
    tooltip: boolean;
}

export interface KeyDataState {
    key: KeyData[],
    loading: boolean,
    maxLimitError: boolean
}

const initialState: KeyDataState = {
    key: [],
    loading: false,
    maxLimitError: false
}

export const fetchKey = createAsyncThunk(
    'key/fetchKey',
    async () => {
        const keys = (await axios.get("/api/profile/key", {
            headers: {
                Authorization: localStorage.getItem("auth"),
            },
        })).data as KeyData[];
        keys.map((ele) => {
            ele.show = false;
            ele.tooltip = false;
        });
        return keys;
    }
)

export const renameKey = createAsyncThunk<{ index: number, name: string }, { index: number, name: string }>(
    'key/renameKey',
    async ({ index, name }, { getState }) => {
        const state: IRoot = getState() as IRoot;
        console.log(state);
        const key = (await axios.put(URL + "/profile/key/" + state.key.key[index].id, {
            name: name
        }, {
            headers: {
                Authorization: localStorage.getItem("auth"),
            },
        })).data;
        return {
            name: name,
            index: index
        };
    }
)

export const deleteKey = createAsyncThunk<{ index: number }, { index: number }>(
    'key/deleteKey',
    async ({ index }, { getState }) => {
        const state: IRoot = getState() as IRoot;
        await axios.delete(URL + "/profile/key/" + state.key.key[index].id, {
            headers: {
                Authorization: localStorage.getItem("auth"),
            },
        })
        return {
            index: index
        };
    }
)

export const addKey = createAsyncThunk<KeyData | string, { name: string }>(
    'key/addKey',
    async ({ name }) => {
        try {
            const key = (await axios.post(URL + "/profile/key", {
                name: name
            }, {
                headers: {
                    Authorization: localStorage.getItem("auth"),
                },
            })).data as KeyData;
            key.show = false;
            key.tooltip = false;
            return key;
        } catch (err) {
            const message = (err as AxiosError<{ message: string }, any>).response?.data?.message;
            if (message?.toLocaleLowerCase().includes("maximum")) {
                return "maximum";
            }
            return "";
        }
    }
)

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        showKey(state, action) {
            state.key[action.payload].show = true;
        },
        notShowKey(state, action) {
            state.key[action.payload].show = false;
        },
        showTooltip(state, action) {
            state.key[action.payload].tooltip = true;
        },
        hiddenTooltip(state, action) {
            state.key[action.payload].tooltip = false;
        },
        hiddenError(state, action) {
            state.maxLimitError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKey.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchKey.fulfilled, (state, action) => {
                state.key = action.payload
                state.loading = false;
            })
            .addCase(fetchKey.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(renameKey.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(renameKey.fulfilled, (state, action) => {
                state.key[action.payload.index].name = action.payload.name;
                state.loading = false;
            })
            .addCase(renameKey.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteKey.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteKey.fulfilled, (state, action) => {
                const beforeKey = [...state.key];
                beforeKey.splice(action.payload.index, 1);
                state.key = [...beforeKey];
                state.loading = false;
            })
            .addCase(deleteKey.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addKey.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addKey.fulfilled, (state, action) => {
                console.log((typeof action.payload) === "string");
                if (typeof action.payload === "string") {
                    state.maxLimitError = true;
                    document.getElementsByTagName("body")[0].classList.add("active-overlay");
                } else {
                    state.key.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(addKey.rejected, (state, action) => {
                state.loading = false;
            })
    },
})

export const { showKey, notShowKey, showTooltip, hiddenTooltip, hiddenError } = keySlice.actions

export const keyReducer = keySlice.reducer