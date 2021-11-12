import {createSlice} from '@reduxjs/toolkit'

const initialStateValue={viewas:"2"};
export const profileActivitySlice=createSlice({
    name:"profileActivity",
    initialState:{viewas:initialStateValue},
    reducers:{
        viewProfileAs:(state,action)=>{
            state.viewas=action.payload;
        }
        
    }
})

export const {viewProfileAs} =profileActivitySlice.actions;

export default profileActivitySlice.reducer;