import React from 'react'

function EventsList() {

    // a component representing an event, consists of sports, pace, date, time
    function Event() {
        return (
            <div id="page-content-wrapper">
                <div class="container-fluid px-4">
                    <div></div>
                    <div className="row g-3 my-2">
                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">Sports</h3>
                                    <p className="fs-5">Place</p>
                                    <p className="fs-5">Date</p>
                                    <p className="fs-5">Time</p>
                                </div>
                                {/* <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (<Event> </Event>)
}



export default EventsList
