import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? null
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            localStorage?.removeItem("userInfo");
        }
    }
})

export default userSlice.reducer;

export function LoginRedux(user) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function LogoutRedux() {
   return (dispatch, getState) => {
       dispatch(userSlice.actions.logout());
   }
}