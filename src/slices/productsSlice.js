import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setProducts, setLoading } = productsSlice.actions;
export default productsSlice.reducer;