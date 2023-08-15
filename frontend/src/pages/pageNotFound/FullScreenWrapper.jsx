import React from "react"
import s from "./FullScreenWrapper.module.css"

const FullScreenWrapper = ({ children }) =>
{
    return <div className={s.fullScreenWrapper}>{children}</div>
}

export default FullScreenWrapper
