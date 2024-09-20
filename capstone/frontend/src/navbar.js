import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './redux/reducers/userSlice';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const cartCount = useSelector(state => state.cart.count); // Get cart count from Redux store

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
    navigate('/cart'); // Navigate to Cart component
  };

  // Hide navbar on /login and /register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Service Booking
          </Link>
        </Typography>

        {token && ( // Show the cart icon only if logged in
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartCount} color="secondary" invisible={cartCount === 0}>
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}

        <IconButton color="inherit" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
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
              <MenuItem onClick={handleClose}>
                <Link to="/consumer/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>My Bookings</Link>
              </MenuItem>
              <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;