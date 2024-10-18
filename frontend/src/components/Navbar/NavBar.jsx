import React from "react";
import styled from "styled-components";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

import CartButton from "./Cart";
import NotificationButton from "./Notification";
import { Link } from "react-router-dom";
const StyledAppBar = styled(AppBar)`
  background-color: rgba(63, 113, 175, 1);
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.12);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

function Navbar() {
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LeftSection>
          <Logo />
          <Typography variant="h4" component="h1" sx={{ ml: "-1em" }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Echommerce
            </Link>
          </Typography>
          <NavLinks />
        </LeftSection>
        <RightSection>
          {/* <SearchBar /> */}
          <CartButton />
          <NotificationButton />
          <UserMenu />
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar;

const SearchBarImage = styled.img`
  width: 187px;
  height: 41px;
  object-fit: contain;
`;
