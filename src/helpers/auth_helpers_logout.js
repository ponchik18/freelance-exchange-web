import { UserManager } from "oidc-client";
import { LogoutRedux } from "../redux/userSlice";
import { dispatch } from "../redux/store";

const settings = {
  authority: "http://localhost:8080/auth/realms/freelance-exchange/",
  client_id: "freelance-web",
  redirect_uri: "http://localhost:3000/user-auth",
  response_type: "code",
  scope: "openid profile email",
};

const userManager = new UserManager(settings);

export const logout = () => {
  userManager
    .signoutPopup()
    .then(() => {
      // Sign-out process completed
      // Optionally, perform additional actions after sign-out
    })
    .catch((error) => {
      // Handle sign-out error
    });

  dispatch(LogoutRedux());
  // }catch(error)
};