import {createSlice} from '@reduxjs/toolkit'

const initialStateValue={visibility:false};
export const configurationActivity=createSlice({
    name:"configurationActivity",
    initialState:{value:initialStateValue},
    reducers:{
        loadingVisibility:(state,action)=>{
            state.value=action.payload;
        },
       
    
    }
})

export const {loadingVisibility} =configurationActivity.actions;

export default configurationActivity.reducer;