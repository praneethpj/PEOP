import {createSlice} from '@reduxjs/toolkit'

const initialStateValue={roomid:"",username:"",roomstatus:"false"};
export const readyCallActivitySlice=createSlice({
    name:"readyCallActivities",
    initialState:{value:initialStateValue},
    reducers:{
        setCalldetails:(state,action)=>{
            state.value=action.payload;
        } 
    }
})

export const {setCalldetails} =readyCallActivitySlice.actions;

export default readyCallActivitySlice.reducer;