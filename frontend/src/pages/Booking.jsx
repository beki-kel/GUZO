import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

function Booking({isLoggedIn}) {
  return (
    <div>
          <div className='flex flex-col w-full min-h-screen bg-white'>
       <Navigation list={['Home', 'Blog', 'Bookings', 'Packages']} title='Exopia' isLoggedIn={isLoggedIn} App={false} />
       <div className='w-full min-h-screen'>
       </div>
       <Footer/>
    </div>
    </div>
  )
}

export default Booking
