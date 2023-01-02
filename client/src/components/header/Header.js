import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
    <div className='headerTitles'>
    <span className='headerTitleSm'>Your</span>
    <span className='headerTitleLg'>Lifelogue</span>
    </div>
    <img 
    className='headerImg'
    src='https://images.unsplash.com/photo-1542820229-081e0c12af0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80'/>
    </div>
  )
}

export default Header