import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../slices/auth";
import { Link, useNavigate } from "react-router-dom";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const UserMenuButton = styled(IconButton)`
  width: 62px;
  height: 62px;
  padding: 0;
`;

const UserMenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function UserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { userId } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.innerText === "Logout") {
      dispatch(logout());
      window.location.reload();
    }

    if (event.target.innerText === "Account") {
      navigate(`/account/${userId}`);
    }

    setAnchorElUser(null);
  };

  return (
    <>
      <UserMenuButton aria-label="User menu" onClick={handleOpenUserMenu}>
        <UserMenuImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/25f476312e448b9ea3e8035a973617587b8b1a01c57de9c83ba82c5d5cef58a8?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7"
          alt="User menu"
        />
      </UserMenuButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default UserMenu;
