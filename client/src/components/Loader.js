import React from 'react'

const Loader = () => {
    return (
        <div className="d-block mx-auto mt-5 spinner-border text-warning" style={{ height: '50px', width: '50px' }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Loader
