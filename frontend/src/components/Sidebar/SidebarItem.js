import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const SidebarItem = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/Profile',
    icon: <PersonIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Appointment',
    path: '/Appointment',
    icon: <EventAvailableIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Prescriptions',
    path: '/Prescriptions',
    icon: <AssignmentIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Pharmacy',
    path: '/support',
    icon: <LocalHospitalIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Cart',
    path: '/Cart',
    icon: <ShoppingCartIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <HelpOutlineIcon />,
    cName: 'nav-text'
  },


];
