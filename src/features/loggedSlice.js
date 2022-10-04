import { createSlice } from "@reduxjs/toolkit"

export const loggedSlice = createSlice ({
    name:"logged",
    initialState: {
        loggedState: false,
    },
    reducer: {
        entry: (state)=>{
            state.loggedState =!stateloggedState;
        },
        loggedTrue: (state)=> {
            state.loggedState =true;
        }
    }
})

export const { entry, loggedTrue} = loggedSlice.actions
export default loggedSlice.reducer