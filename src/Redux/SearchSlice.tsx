import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface SearchState {
  search: string;
  selectedCategory: string;
  minprice: number | undefined;
  maxprice: number | undefined;
  keywords: string;
}

const initialState: SearchState = {
  search: "",
  selectedCategory: "",
  minprice: undefined,
  maxprice: undefined,
  keywords: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | undefined>) {
      state.minprice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | undefined>) {
      state.maxprice = action.payload;
    },
    setKeywords(state, action: PayloadAction<string>) {
      state.keywords = action.payload;
    },
    resetfilters ( state ){
      state.search = "";
      state.minprice = undefined;
      state.maxprice = undefined;
      state.selectedCategory = "all";
      state.keywords = "";
    }
  },
});

export const {
  setSearch,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setKeywords,
  resetfilters,
  
} = searchSlice.actions;

export default searchSlice.reducer;
