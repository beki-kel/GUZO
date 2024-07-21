import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from "@material-tailwind/react";
import {IconButton,Typography,List,ListItem,ListItemPrefix,ListItemSuffix,Chip,Accordion,AccordionHeader,AccordionBody,Alert,Input,Drawer,Card,} from "@material-tailwind/react";
import {PresentationChartBarIcon,ShoppingBagIcon,UserCircleIcon,Cog6ToothIcon,InboxIcon,PowerIcon,} from "@heroicons/react/24/solid";
import {ChevronRightIcon,ChevronDownIcon,CubeTransparentIcon,MagnifyingGlassIcon,Bars3Icon,XMarkIcon,} from "@heroicons/react/24/outline";
 

function Navigation(props) {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const menu = props.list;
  const title = props.title;
  const islogged= props.isLoggedIn;
  const App = props.App;

  const navigate = useNavigate()
  // Function to remove JWT token from browser storage
const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

  // Function to handle logout
const handleLogout = () => {
  removeTokenFromStorage();
  // Redirect to login page
  navigate('/login');
};

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const menuItems = menu.map((item, index) => {
      if(!islogged){
        return(
          <Link key={`menu-item-${index}`} to="/login">
            <button className='hover:text-orange-400'>{item}</button>
          </Link>
      );
      }else{
        return(
          <Link key={`menu-item-${index}`} to={`/${item}`}>
            <li className='hover:text-orange-800 active:text-orange-800 text-black'>{item}</li>
          </Link>
        )
      }

  });

  return (
    <div className='flex flex-row w-full h-16 bg-white border-b-[1px] shadow-md rounded-b-3xl  items-center justify-center fixed z-50' >
        <div className='flex w-full items-center p-3'>
            {islogged && title ? <Link to='/home' className='flex w-2/12 items-center p-3'>
                <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
                <h2 className='text-xl font-medium'>{title}</h2>
            </Link> : <Link to='/login' className='flex w-2/12 items-center p-3'>
                <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
                <h2 className='text-xl font-medium'>{title}</h2>
            </Link>}
            { App ? <button className='flex w-auto border-2 border-orange-500 items-center mx-5 ml-auto px-3 py-2  rounded-lg justify-center '>
                <FontAwesomeIcon icon={faDownload} style={{ color: "#ff622e" }} className='mr-2' />
                <p> Get App</p>
            </button> : <div> </div>}
            <ul className='flex w-7/12 space-x-10 justify-center ml-6 text-lg'>
                {menuItems}
            </ul>

            <div className='ml-80'>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8" onClick={openDrawer}/>
                ) : (
                  <UserCircleIcon className="h-10 w-10" onClick={openDrawer}/>
                )}
              <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4">
                  <div className="mb-2 flex items-center gap-4 p-4 border-b-2">
                    <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2 h-8 w-8' />
                    <h2 className='text-2xl font-medium '>{title}</h2>
                  </div>
                  <List>
                    <ListItem >
                      <ListItemPrefix className='text-black'>
                        <UserCircleIcon className="h-8 w-8" />
                      </ListItemPrefix>
                      <span className='text-orange-800 font-serif text-xl'>Profile</span>
                    </ListItem>

                    <ListItem onClick={handleLogout}>
                      <ListItemPrefix className='text-black'>
                        <PowerIcon className="h-8 w-8" />
                      </ListItemPrefix>
                      <span className='text-orange-800 text-xl font-serif'>Log Out</span>
                    </ListItem>
                  </List>
                </Card>
              </Drawer>
            </div>
        </div>
    </div>
);}

export default Navigation;
