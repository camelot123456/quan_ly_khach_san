import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../../constants";

import  parseJwt from '../../../commons/jwt-common'

function InvoicePublic () {

    const ref = useRef('')
    const navigate = useNavigate();

    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (parseJwt(accessToken)) {
        ref.current = parseJwt(accessToken)
        }
    } catch (error) {
        navigate("/auth/login")
    }

    return (
        <>
            {ref.current.claims.roles.includes('ROLE_MEMBER', 'ROLE_DIRECTOR', 'ROLE_BUSINESS', 'ROLE_ACCOUNTANT', 'ROLE_RECEPTIONISTS') ? (
                <h1>invoice</h1>
            ) : (
                <Navigate to="/auth/login" />
            )}
        </>
    )

}

export default InvoicePublic;