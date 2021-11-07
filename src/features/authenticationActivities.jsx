import { createSlice } from "@reduxjs/toolkit";
import userActivities from "./userActivities";


const initialState={"user":"","jwt":""};
export const authenticationActivities=createSlice({
    name:"authenticationActivity",
    initialState:{user:initialState},
    reducers:{

        
        signedUser:(state,actions)=>{
            state.user=actions.payload
        },
        logout:(state)=>{
            state.user=null
            localStorage.setItem("token","");
        }
      
    }
})

export const{signedUser,logout}=authenticationActivities.actions;

export const LoggedUser=(state)=>state.user.user;

export default authenticationActivities.reducer;