import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface UserState {
    user: {
        id: string,
        name: string,
        email: string,
        roles: string
    },
    login: boolean,
    loading: boolean
}

const initialState: UserState = {
    user: {
        id: "",
        name: "",
        email: "",
        roles: ""
    },
    login: false,
    loading: false
}

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async () => {
        try {
            const user = (
                await axios.get("/api/profile/me", {
                    headers: {
                        Authorization: localStorage.getItem("auth"),
                    },
                })
            ) as { id: string, name: string, email: string, roles: string };
            return user;
        } catch (err) {

        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user.id = action.payload.id;
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;
            state.user.roles = action.payload.roles;
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user.id = action.payload.id;
                    state.user.email = action.payload.email;
                    state.user.name = action.payload.name;
                    state.user.roles = action.payload.roles;
                    state.login = true;
                    state.loading = false;
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.login = false;
                state.loading = false;
            })
    },
})

export const { setUser } = userSlice.actions

export const userReducer = userSlice.reducer