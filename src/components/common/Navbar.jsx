import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useContext, useMemo } from 'react';
import { LoginContext } from '../../contexts/LoginProvider/LoginContext';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import {
  MdBarChart,
  MdHistory,
  MdLogout,
  MdMenuBook,
  MdPeople,
  MdRestaurantMenu,
  MdSettings,
  MdSupportAgent,
  MdTableBar,
} from 'react-icons/md';
import { LuCircleUser } from 'react-icons/lu';

const Navbar = ({ brandLink = '/' }) => {
  const { loggedInUser, handleLogout } = useContext(LoginContext);
  const navigate = useNavigate();
  const role = loggedInUser?.role;

  const links = useMemo(() => {
    if (role === 'owner') {
      return [
        { label: 'Hotel', path: '/owner/hotel', icon: HiBuildingOffice2 },
        { label: 'Booking', path: '/owner/orders', icon: MdTableBar },
        { label: 'Menu', path: '/owner/menu', icon: MdRestaurantMenu },
        { label: 'Staff', path: '/owner/staff', icon: MdPeople },
        { label: 'Reports', path: '/owner/reports', icon: MdBarChart },
      ];
    }
    if (role === 'user') {
      return [
        { label: 'Menu', path: '/user/menu', icon: MdMenuBook },
        { label: 'Orders', path: '/user/orders', icon: MdHistory },
        { label: 'Support', path: '/user/support', icon: MdSupportAgent },
      ];
    }
    return [];
  }, [role]);

  const userNavigation = useMemo(() => {
    if (role === 'owner') {
      return [
        {
          name: 'Your profile',
          onClick: () => navigate('/owner/profile'),
          icon: LuCircleUser,
        },
        {
          name: 'Settings',
          onClick: () => navigate('/owner/settings'),
          icon: MdSettings,
        },
        { name: 'Sign out', onClick: handleLogout, icon: MdLogout },
      ];
    }
    if (role === 'user') {
      return [
        {
          name: 'Profile',
          onClick: () => navigate('/user/profile'),
          icon: LuCircleUser,
        },
        {
          name: 'Settings',
          onClick: () => navigate('/user/settings'),
          icon: MdSettings,
        },
        { name: 'Sign out', onClick: handleLogout, icon: MdLogout },
      ];
    }
    return [];
  }, [role, navigate, handleLogout]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link
          to={brandLink}
          className="text-3xl font-bold text-gray-700 hover:text-(--color-primary)"
        >
          BRUNCH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-2 text-gray-700 hover:text-(--color-primary) transition"
            >
              <item.icon /> <span>{item.label}</span>
            </Link>
          ))}

          {/* Profile dropdown */}
          {loggedInUser && (
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt="profile"
                  src={
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  }
                  className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-xl py-1 outline-1 -outline-offset-1 outline-white/10 transition"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <button
                      onClick={item.onClick}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:text-(--color-primary)"
                    >
                      <item.icon className="mr-1 text-xl" />
                      {item.name}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
