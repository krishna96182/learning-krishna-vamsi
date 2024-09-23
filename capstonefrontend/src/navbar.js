import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge, Box } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './redux/reducers/userSlice';
import logoImg from './logo.png';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const cartCount = useSelector(state => state.cart.count);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/consumer/dashboard');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleMyBookingsClick = () => {
    navigate('/mybookings');
    handleClose();
  };

  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    }
    handleClose();
  };

  // Hide navbar on /login and /register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // Check if current route is /provider/dashboard or /verification/:id
  const isProviderRoute = location.pathname.startsWith('/provider/dashboard') || location.pathname.startsWith('/verification');

  // Check if the current route is /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Service Booking
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {token && !isProviderRoute && !isAdminRoute && (
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartCount} color="secondary" invisible={cartCount === 0}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}

          {!isAdminRoute && (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!token ? (
                  <MenuItem onClick={handleClose}>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                  </MenuItem>
                ) : (
                  <>
                    {/* Remove Profile option on provider routes */}
                    {!isProviderRoute && (
                      <MenuItem onClick={handleProfileClick}>
                        Profile
                      </MenuItem>
                    )}
                    {!isProviderRoute && (
                      <MenuItem onClick={handleMyBookingsClick}>
                        My Bookings
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                      Logout
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
