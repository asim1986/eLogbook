import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        data: (state) => {

        }
    }
});

export const {data} = slice.actions;

export default slice.reducer;
