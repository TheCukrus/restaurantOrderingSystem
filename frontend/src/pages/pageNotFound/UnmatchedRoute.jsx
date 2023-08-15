import React from "react";
import { Link } from "react-router-dom";
import FullScreenWrapper from "./FullScreenWrapper";
import s from "./UnmatchedRoute.module.css"

const UnmatchedRoute = () =>
{
    return (
        <FullScreenWrapper>
            <div className={s.UnmatchedRoute} >
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link to="/">Go to Home</Link>
            </div>
        </FullScreenWrapper>
    );
};

export default UnmatchedRoute;
