import React, { useState } from "react"

const Test = (props: any) => {

    const [flag, setFlag] = useState(false)
    return (
        <div style={{
            height: '100px',
            display: 'flex',
            flexDirection: 'column'
        }}
        onMouseEnter={()=>{setFlag(true)}}
        onMouseLeave={()=>{setFlag(false)}}
        >
            {props.value?
            <><div>{props.value.planDateStart}</div>
            <div>{props.value.planDateEnd}</div>
            </>: <></>
            }
            {flag? <div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
            </div>: <></>}
        </div >
    )
}

export default Test