import React from "react";

const Alert = props => {
    return (
        <div className={'"alert '+ (props.class || 'info-mesage')} role="alert">
            <span className="slds-assistive-text">info</span>
            <h2>{props.text}</h2>
            <div className="slds-notify__close">
                <button className="alert-close" title="Close">
                    x
                    <span className="slds-assistive-text">Close</span>
                </button>
            </div >
        </div >
    )
}
export default Alert;