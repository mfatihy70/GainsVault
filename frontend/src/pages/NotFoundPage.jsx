import { Link } from 'react-router-dom'
//import { FaExclamationTriangle } from 'react-icons/fa'
import React from 'react'

function NotFoundPage() {
    return (
        <>
            <h2>Unexpected Application Error!</h2>
            <h3 style={{ fontStyle: "italic" }}>404 Not Found</h3>
            <p>💿 Hey developer 👋</p>
            <p>
                You can provide a way better UX than this when your app throws errors by
                providing your own{" "}
                <code
                    style={{
                        padding: "2px 4px",
                        backgroundColor: "rgba(200, 200, 200, 0.5)"
                    }}
                >
                    ErrorBoundary
                </code>{" "}
                or{" "}
                <code
                    style={{
                        padding: "2px 4px",
                        backgroundColor: "rgba(200, 200, 200, 0.5)"
                    }}
                >
                    errorElement
                </code>{" "}
                prop on your route.
            </p>
            <Link to='/' className=' •text—white rounded px—3 py—2 mt—4'> GO Back </Link>
        </>
    )
}

export default NotFoundPage