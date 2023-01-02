import React from 'react'
import Sidebar from '../../sidebar/Sidebar'
import Singlepost from '../../singlePost/Singlepost'
import './Single.css'

function Single() {
  return (
    <div className='single'>
    <Singlepost/>
    <Sidebar/>
    </div>
  )
}

export default Single