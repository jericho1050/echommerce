import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';

function CartButton() {
    //   return <SearchBarImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/eed4296c051ae0f28f8e5c7dc5147b88d6387b99bb19bf771d59930ee02d71f9?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7" alt="Search Bar" />;
    return (
      <IconButton>
        <ShoppingCartIcon  fontSize="large"  sx={{ height: 30, width: 30, color: 'white'}}/>
      </IconButton>
    );
  }
  
  export default CartButton;