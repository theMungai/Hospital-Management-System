import React from 'react'
import Footer from './common/Footer'
import NavBar from './common/NavBar'

const Layout = ({children}) => {
  return (
    <>
      <div>
        <NavBar/>
        {children}
      </div>
      <Footer/>
    </>
    
  )
}

export default Layout
