// CartIcon.jsx
import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCartCount } from '../redux/actions/cartActions'; // Import action to reset cart count

const CartIcon = () => {
  const cartCount = useSelector((state) => state.cart.count); // Adjust based on your state structure
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (cartCount > 0) {
      dispatch(resetCartCount()); // Reset cart count when navigating to cart page
    }
    navigate('/cart'); // Navigates to Cart component
  };

  // return (
  //   <IconButton
  //     color="inherit"
  //     onClick={handleClick}
  //     sx={{ position: 'absolute', top: 16, right: 16 }} // Positioning the icon
  //   >
  //     <Badge
  //       badgeContent={cartCount}
  //       color="secondary"
  //       invisible={cartCount === 0} // Hide badge if cart is empty
  //       sx={{ position: 'absolute', top: 0, right: 0 }}
  //     >
  //       <ShoppingCartIcon />
  //     </Badge>
  //   </IconButton>
  // );
};

export default CartIcon;
