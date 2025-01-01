import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  successCount: number;
  failedCount: number;
}

const initialState: CounterState = {
  successCount: 0,
  failedCount: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementSuccess(state) {
      state.successCount += 1;
    },
    incrementFailed(state) {
      state.failedCount += 1;
    },
  },
});

export const { incrementSuccess, incrementFailed } = counterSlice.actions;

export default counterSlice.reducer;
