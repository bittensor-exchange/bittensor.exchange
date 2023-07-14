import { createSlice } from "@reduxjs/toolkit"

export type ThemeColor = 'light' | 'dark' | 'system';

export interface ConfigState {
  theme: ThemeColor;
}

const initialState: ConfigState = {
    theme: 'system'
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
      switchThemeColor(state, action) {
        state.theme = action.payload;
      }
    },
})

export const { switchThemeColor } = configSlice.actions

export const configReducer = configSlice.reducer