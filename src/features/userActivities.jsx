import {createSlice} from '@reduxjs/toolkit'

const initialStateValue={userid:""};
export const userActivitySlice=createSlice({
    name:"userActivity",
    initialState:{value:initialStateValue},
    reducers:{
        selectUser:(state,action)=>{
            state.value=action.payload;
        },
        startedtheCall:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const {selectUser,startedtheCall} =userActivitySlice.actions;

export default userActivitySlice.reducer;