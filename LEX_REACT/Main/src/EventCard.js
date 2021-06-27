import React from 'react'

function EventCard(props) {
    const{sport, setSport, place, setPlace, date, setDate, time, setTime, quota, setQuota} = props;

    // a component representing an event, consists of sports, pace, date, time
    
        return (
            //initial attempt
            // <div id="page-content-wrapper">
            //     <div class="container-fluid px-4">
            //         <div></div>
            //         <div className="row g-3 my-2">
            //             <div className="col-md-3">
            //                 <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                // <div>
                                //     <h3 className="fs-2">{sport}</h3>
                                //     <p className="fs-5">{place}</p>
                                //     <p className="fs-5">{date}</p>
                                //     <p className="fs-5">{time}</p>
                                //     <p className="fs-5">{quota}</p>
                                // </div>
                                // {/* <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i> */}
                            // {/* </div>
            //             </div>
            //         </div>
            //     </div>
            // </div> */}
            
            <div className="card">
                <div class="card-body">
                     <h3 className="fs-2">sport</h3>
                    <p className="fs-5">{place}</p>
                    <p className="fs-5">{date}</p>
                    <p className="fs-5">{time}</p>
                    <p className="fs-5">{quota}</p>
                        </div>
                    </div>
                
            
        )
    

    
}



export default EventCard
