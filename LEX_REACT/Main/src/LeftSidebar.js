import React from 'react'
import { Link } from 'react-router-dom'

function LeftSidebar() {
    return (
        <div className="collapse" id="collapseExample">
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 fs-4 fw-bold text-uppercase border-bottom">
                    {/* <i class="fas fa-user-secret me-2"></i> */}
                    Welcome, name!</div>
                <div className="list-group list-group-flush my-3">
                    <Link to='/Create-event'><a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-comment-dots me-2"></i>Create Event</a></Link>
                    <Link to='/Dashboard-event'><a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-map-marker-alt me-2"></i>Events</a></Link>
                        <Link to='/testing'><a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-map-marker-alt me-2"></i>Testing</a></Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
