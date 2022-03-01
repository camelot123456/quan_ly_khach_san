import { Outlet } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Header from "../fragments/Header";



function WebLayout() { 
    
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default WebLayout;