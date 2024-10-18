import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, MobileStepper, useTheme, useMediaQuery } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import CarouselItem from './CarouselItem';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const TrendingCarousel = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  let itemsPerPage;
  if (isSmallScreen) {
    itemsPerPage = 1;
  } else if (isMediumScreen) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 3;
  }

  const [hasPrev, setHasPrev] = useState(index > 0);
  const [hasNext, setHasNext] = useState(
    index < Math.ceil(carouselItems.length / itemsPerPage) - 1
  );

  useEffect(() => {
    setHasPrev(index > 0);
    setHasNext(index < Math.ceil(carouselItems.length / itemsPerPage) - 1);
  }, [index, itemsPerPage]);

  const handleNextPage = () => {
    if (hasNext) {
      setIndex(index + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      setIndex(index - 1);
    }
  };

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  const groupedItems = [];
  for (let i = 0; i < carouselItems.length; i += itemsPerPage) {
    groupedItems.push(carouselItems.slice(i, i + itemsPerPage));
  }

  return (
    <CarouselWrapper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={index}
        onChangeIndex={handleIndexChange}
      >
        {groupedItems.map((group, groupIndex) => (
          <CarouselContainer key={groupIndex}>
            {group.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </CarouselContainer>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={Math.ceil(carouselItems.length / itemsPerPage)}
        position="static"
        activeStep={index}
        nextButton={
          <Button size="small" onClick={handleNextPage} disabled={!hasNext}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handlePrevPage} disabled={!hasPrev}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled(Box)`

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 600px;
  overflow: hidden; /* Ensure no overflow */

`;

const CarouselContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px 32px;
  width: 100%;
  flex-shrink: 0;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const carouselItems = [
  { id: 1, imageUrl: 'https://imgur.com/QVOChQp.jpg', title: 'Trending' },
  { id: 2, imageUrl: 'https://imgur.com/yu9jT8q.jpg', title: 'Sports' },
  { id: 3, imageUrl: 'https://imgur.com/BYNiOUs.jpg', title: 'New Balanci' },
  { id: 4, imageUrl: 'https://imgur.com/BYNiOUs.jpg', title: 'HANGIN JORDANS' },
  { id: 5, imageUrl: 'https://imgur.com/5Ufn152.jpg', title: 'JADIDAS' },
];

export default TrendingCarousel;