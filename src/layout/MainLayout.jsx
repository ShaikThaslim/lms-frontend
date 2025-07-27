import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-hlscreen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            { <Outlet/>/*to render childern we use outlet which is in the react-router-dom */}

        </div>
    </div>
  )
}

export default MainLayout