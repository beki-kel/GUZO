import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
function Navigation(props) {
  const menu = props.list;
  const title = props.title;
  const islogged= props.isLoggedIn;

  const menuItems = menu.map((item, index) => {
      if(!islogged){
        return(
          <Link key={`menu-item-${index}`} to="/login">
            <li className='hover:text-orange-400'>{item}</li>
          </Link>
      );
      }else{
        return(
          <Link key={`menu-item-${index}`} to={`/${item}`}>
            <li className='hover:text-orange-400'>{item}</li>
          </Link>
        )
      }

  });

  return (
    <div className='flex flex-row w-full h-16 bg-black text-white items-center justify-center fixed z-50' >
        <div className='flex w-full items-center p-3'>
            {islogged ? <Link to='/home' className='flex w-2/12 items-center p-3'>
                <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
                <h2 className='text-xl font-medium'>{title}</h2>
            </Link> : <Link to='/login' className='flex w-2/12 items-center p-3'>
                <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
                <h2 className='text-xl font-medium'>{title}</h2>
            </Link>}
            <button className='flex w-auto border-2 items-center mx-5 ml-auto px-3 py-2  rounded-lg border-white justify-center '>
                <FontAwesomeIcon icon={faDownload} style={{ color: "#ff622e" }} className='mr-2' />
                <p> Get App</p>
            </button>
            <ul className='flex w-7/12 space-x-5 justify-end text-lg'>
                {menuItems}
            </ul>
        </div>
    </div>
);
}

export default Navigation;
