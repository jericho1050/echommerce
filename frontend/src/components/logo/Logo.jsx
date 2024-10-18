import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  width: 86px;
  height: 86px;
  object-fit: contain;
`;

function Logo() {
  return <LogoImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b4481f9fcd05201344596c9bc3316250dedaaad29e87c11a7aed9f141e69fe2?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7" alt="Echo's Market Logo" />;
}

export default Logo;