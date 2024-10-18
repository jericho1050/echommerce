import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPanel = styled(Box)(({ theme, backgroundColor, color, marginTop }) => ({
  backgroundColor: backgroundColor,
  display: 'flex',
  minHeight: '205px',
  width: '100vw',
  flexDirection: 'column',
  color: color,
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.46px',
  justifyContent: 'center',
  padding: '1em',
  font: '500 15px/26px Roboto, sans-serif',
  marginTop: marginTop || 0,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    whiteSpace: 'initial',
    padding: '0 20px',
  },
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function CategoryPanel({ image, buttonText, backgroundColor, color, marginTop }) {
  return (
    <StyledPanel backgroundColor={backgroundColor} color={color} marginTop={marginTop}>
      <ImageButton focusRipple style={{ width: '100%' }}>
        <ImageSrc style={{ backgroundImage: `url(${image})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={(theme) => ({
              position: 'relative',
              p: 4,
              pt: 2,
              pb: `calc(${theme.spacing(1)} + 6px)`,
            })}
          >
            {buttonText}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>
    </StyledPanel>
  );
}

export default CategoryPanel;