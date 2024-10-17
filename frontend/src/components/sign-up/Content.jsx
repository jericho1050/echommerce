import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { EchosMarketIcon } from '../CustomIcons';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Button, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '0.5rem 1.25rem',
  width: '100%',
  borderRadius: theme.spacing(2),
  '&:hover': {
    scale: 1.03,
    cursor: 'pointer',
    boxShadow: theme.shadows[1],
  },
}));
const items = [
  // {
  //   icon: <SupervisorAccountIcon sx={{ color: 'text.secondary' }} />,
  //   title: 'Sign Up as Admin',
  //   description: 'Manage users, view reports, and more.',
  //   role: 'admin',
  // },
  {
    icon: <SellIcon sx={{ color: 'text.secondary' }} />,
    title: 'Sign Up as Seller',
    description: 'Sell your products, manage orders, and more.',
    role: 'seller',
  },
  {
    icon: <ShoppingBasketIcon sx={{ color: 'text.secondary' }} />,
    title: 'Sign Up as Shopper',
    description: 'Browse products, purchase items, and more.',
    role: 'shopper',
  },
  {
    icon: <NoAccountsIcon sx={{ color: 'text.secondary' }} />,
    title: 'Continue as anonymous',
    description: 'Browse products without an account.',
    role: 'anonymous',
  },
];

export default function Content({role, setRole}) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (role === 'anonymous') {
      navigate('/')
    }
  })
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 3,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <EchosMarketIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction='row' sx={{ gap: 2 }}>
            <Button onClick={() => {

              setRole(item.role)
            }} component={'div'} hidden disableRipple disableFocusRipple disableElevation fullWidth sx={{
        '&:hover': {
          backgroundColor: 'transparent'
        },
      }}>
            <Item>
              <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                <span style={{ paddingRight: '1em' }}>{item.icon}</span>
                {item.title}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </Item>
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}

Content.propTypes = {
  role: PropTypes.string.isRequired, // Adjust the type and requirement as needed
  setRole: PropTypes.func.isRequired, // Adjust the type and requirement as needed
};