import React from 'react'

export default function OverlayLoading() {
    return (
        <div className="menu-overlay d-flex flex-row justify-content-center align-items-center" style={{display:  "block" }}  >
       <div className="d-flex justify-content-center mt-5 ">
          <img
             style= {{width:70,height:70} }
              src={"https://www.legitquest.com/lq/lq-spin.gif"}
              alt="legitquest"
            />
          </div> 
      </div>
    )
}
