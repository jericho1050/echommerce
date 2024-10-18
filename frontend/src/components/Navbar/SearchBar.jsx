import React from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";



function SearchBar() {
  return (
    <IconButton>
      <SearchIcon  fontSize="large"  sx={{ height: 30, width: 30, color: 'white'}}/>
    </IconButton>
  );
}

export default SearchBar;
