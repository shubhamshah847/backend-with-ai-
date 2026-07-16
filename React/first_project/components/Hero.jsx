import React from 'react'

import img1 from '../src/assets/img1.png'
import img2 from '../src/assets/img2.png'
import img3 from '../src/assets/img3.png'


function Hero(){
    return(
    <div className="hero">
        <img src={img1} alt="width=' "></img>
        <img src={img2} alt="width=' "></img>
        <img src={img3} alt="width=' "></img>
    </div>
    )
}

export default Hero ;