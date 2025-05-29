import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? null,
    token: JSON.parse(window?.localStorage.getItem("token")) ?? null
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo))
            localStorage.setItem("token", JSON.stringify(action.payload.token))
            state.user = action.payload.userInfo
            state.token = action.payload.token
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.setItem("userInfo", null);
            localStorage.setItem("token", null);
        }
    }
})

export default userSlice.reducer;

export function LoginRedux(user, token) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.login({
            userInfo: user,
            token: token
        }));
    };
}

export function LogoutRedux() {
   return (dispatch, getState) => {
       dispatch(userSlice.actions.logout());
   }
}