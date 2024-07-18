import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import HomePricingCard from '../components/HomePricingCard'

function Packages({isLoggedIn}) {
  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
       <Navigation list={['Home', 'Blog', 'Bookings', 'Packages']} title='Exopia' isLoggedIn={isLoggedIn} App={false} />
       <div className='w-full mt-24'>
       <HomePricingCard isLoggedIn={isLoggedIn}/>
       </div>
       <Footer/>
    </div>
  )
}

export default Packages
