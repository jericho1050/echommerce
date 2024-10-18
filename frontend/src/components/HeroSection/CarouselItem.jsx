// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledCarouselItem = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   borderRadius: '56px',
//   position: 'relative',
//   aspectRatio: '0.898',
//   minWidth: '240px',
//   overflow: 'hidden',
//   whiteSpace: 'nowrap',
//   flex: 1,
//   flexBasis: '0%',
//   [theme.breakpoints.down('md')]: {
//     whiteSpace: 'initial',
//   },
// }));

// const StyledContent = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   minHeight: '413px',
//   padding: '334px 32px 32px',
//   [theme.breakpoints.down('md')]: {
//     whiteSpace: 'initial',
//     padding: '100px 20px 0',
//   },
// }));

// function CarouselItem({ image, content }) {
//   return (
//     <StyledCarouselItem>
//       <Box component="img" src={image} alt="" loading="lazy" sx={{ position: 'absolute', inset: 0, height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'center' }} />
//       <StyledContent>
//         <Typography variant="h6" color="inherit">
//           {content}
//         </Typography>
//       </StyledContent>
//     </StyledCarouselItem>
//   );
// }

// export default CarouselItem;