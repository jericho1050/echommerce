import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const NavLinksContainer = styled.nav`
  display: flex;
  gap: 26px;
`;

const StyledButton = styled(Button)`
  color: white;
  font-size: 20px;
  text-transform: none;
`;

function NavLinks() {
  return (
    <NavLinksContainer>
      <StyledButton disabled>Sell</StyledButton>
      <StyledButton disabled>Explore</StyledButton>
    </NavLinksContainer>
  );
}

export default NavLinks;