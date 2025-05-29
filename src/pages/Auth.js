import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import Office from "../assests/Office.png";
import {SignUp} from "../components";

const Auth = () => {
    const {user} = useSelector(state => state.user)
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(true);

    let from = location?.state?.from?.pathname || "/";
    if(user?.token) {
        return window.location.replace(from);
    }
    return <div className={"w-full"}>
        <img
            src={Office}
            alt={Office}
            className={"object-contain mx-auto"}
        />
        <SignUp open={isOpen} setOpen={setIsOpen}/>
    </div>;
}

export default Auth;