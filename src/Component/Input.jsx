import React from "react";
const Input = props => {
    return (
        <input
            name={props.name}
            id={props.id}
            placeholder={props.placeHolder || null}
            type={props.type || 'text'}
            onBlur={props.handleBlur || null}
            onChange={props.handleChange || null}
            className="slds-input" />
    )
}
export default Input;