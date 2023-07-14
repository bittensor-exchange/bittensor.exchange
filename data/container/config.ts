import { createSlice } from "@reduxjs/toolkit"

export type ThemeColor = 'light' | 'dark' | 'system';

export interface ConfigState {
  theme: ThemeColor;
}

const initialState: ConfigState = {
    theme: typeof localStorage !== 'undefined' ? (localStorage.getItem('theme') as ThemeColor ?? 'system') : 'system',
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
      switchThemeColor(state, action) {
        state.theme = action.payload;
        localStorage.setItem('theme', state.theme);
      }
    },
})

export const { switchThemeColor } = configSlice.actions

export const configReducer = configSlice.reducer