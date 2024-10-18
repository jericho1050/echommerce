import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionWrapper>
      <AccordionItem>
        <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
          <AccordionTitle>{title}</AccordionTitle>
          <AccordionIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4a547e11a692dcc69dd7ef81b051cfc276dc2acbee08b23b2a353f0c6871be2?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7" alt={isOpen ? "Close" : "Open"} />
        </AccordionHeader>
        {isOpen && <AccordionContent>{content}</AccordionContent>}
      </AccordionItem>
    </AccordionWrapper>
  );
};

const AccordionWrapper = styled.div`
  display: flex;
  margin-top: 27px;
  width: 100%;
  max-width: 724px;
  flex-direction: column;
  font-size: 18px;
  color: #1e1e1e;
  justify-content: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionItem = styled.div`
  border-radius: 9px;
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18px;
  border: 1px solid #d9d9d9;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionHeader = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 9px;
  font-weight: 600;
  line-height: 1.4;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionTitle = styled.span`
  flex: 1;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 22px;
`;

const AccordionContent = styled.div`
  align-self: stretch;
  flex: 1;
  margin-top: 9px;
  width: 100%;
  font-weight: 400;
  line-height: 25px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default AccordionSection;