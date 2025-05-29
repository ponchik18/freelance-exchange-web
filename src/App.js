import {Navigate, Route, Routes} from "react-router-dom";
import {Footer, Navbar} from "./components";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloakSetting from "./helpers/keycloak";
import {adminRoutes, customerRoutes, freelancerRoutes, publicRoutes} from "./routes";
import {getUserData} from "./axios/KeycloakService";
import {LoginRedux, LogoutRedux} from "./redux/userSlice";
import useAxiosInterceptor from "./utils/useAxiosInterceptor";

function App() {
    const {user} = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    useAxiosInterceptor();

    // Обработчик события на авторизацию и обновление токена
    const onKeycloakEvent = (event, error) => {
        if (event === "onAuthSuccess") {
            console.log("Success auth")
            getUserData(keycloakSetting.token).then((userData) => {

                dispatch(LoginRedux(userData.data, keycloakSetting.token));

            });
        } else if (event === "onAuthLogout") {
            dispatch(LogoutRedux());
        }
    };

    // Отслеживание события обновления токенов
    const onKeycloakTokens = (tokens) => {
        if (keycloakSetting.authenticated) {
            getUserData(tokens.token).then((userData) => {
                dispatch(LoginRedux(userData.data, tokens.token));
            });
        } else {
            dispatch(LogoutRedux());
        }
    };

    const renderRoutes = () => {
        let routes =
            !user
                ? publicRoutes
                : user.role === "FREELANCER"
                    ? freelancerRoutes
                    : user.role === "CUSTOMER"
                        ? customerRoutes
                        : adminRoutes;

        return routes.map((route) => {
            if (route.isNavigate) {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<Navigate to={route.navigatePath} replace={true}/>}
                    />
                );
            }
            return <Route key={route.path} path={route.path} element={route.element}/>;
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ReactKeycloakProvider
                authClient={keycloakSetting}
                onEvent={onKeycloakEvent}
                onTokens={onKeycloakTokens}
            >
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
                <main className="flex-grow mx-8">
                    <Routes>{renderRoutes()}</Routes>
                </main>
                {user && <Footer/>}
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
