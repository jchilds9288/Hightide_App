import React from "react";
import "./DeleteBtn.css"

export const DeleteBtn = props => (
    <div className = "DeleteBtn" {...props}>   
        <div className="outer">
            <div className="inner">
                <label>Remove!</label>
            </div>
        </div>
    </div>
)