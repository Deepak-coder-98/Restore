import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem("isDarkMode");
  return storedDarkMode ? JSON.parse(storedDarkMode) : true;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        isDarkMode: getInitialDarkMode()
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        toggleDarkMode: (state) => {
            localStorage.setItem("isDarkMode", JSON.stringify(!state.isDarkMode));
            state.isDarkMode = !state.isDarkMode;
        }
    }
});

export const {startLoading, stopLoading, toggleDarkMode} = uiSlice.actions;