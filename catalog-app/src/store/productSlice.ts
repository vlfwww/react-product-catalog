import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../api/products'; 
import type { Product } from '../types/product';

interface ProductState {
  items: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productApi.getAll();
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  return await productApi.getCategories();
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productSlice.reducer;