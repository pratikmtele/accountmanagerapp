import React, { forwardRef, useId } from 'react';

function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    // Generate a unique ID using useId hook 
    const id = useId();
    return (
        <>
            <div className="mb-3">
                {label && <label htmlFor={id} className="form-label">{label}</label>}
                <input type={type} className={`form-control ${className}`} id={id} {...props} ref={ref} />
            </div>
        </>
    );
}

// Forwarding the ref to the component using forwardRef
export default forwardRef(Input);
