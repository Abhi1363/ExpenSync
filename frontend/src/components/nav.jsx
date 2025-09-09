import React from 'react'
import './nav.css'
import logo from '../assets/logo.jpg'; 

const nav = () => {
  return (
    <div className='navbar'>
     <img src={logo} width={100} height={50}  alt="logo" /> <p> Expensync</p> 
      
      
    </div>
  )
}

export default nav
