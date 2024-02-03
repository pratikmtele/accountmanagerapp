import React from 'react'

function Button({
    children = '',
    type = 'button',
    className = '',
    ...props
}) {
    // Render a button element with specified type, className, and other props
    return (
        <button type={type} className={`p-2 btn btn-primary ${className}`} {...props}>{children}</button>
    )
}

// Export Button component
export default Button
