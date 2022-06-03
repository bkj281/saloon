import React from 'react'

const Message = ({children}) => {
    return (
        <div className="alert alert-light" role="alert">
            {children}
        </div>
    )
}

export default Message
