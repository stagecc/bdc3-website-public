import { createTheme } from '@mui/material/styles';

const color = {
  white: '#eee',
  lightgrey: '#a0a2a4',
  grey: '#606264',
  crimson: '#b33243',
  crimsonDark: '#5a2a38',
  eggplant: '#323268',
  eggplantDark: '#202050',
  blueberry: '#21568a',
  blueberryLight: '#21568a66',
  blueberryDark: '#01366a',
  sky: '#e3f2fd',
  peach: '#f2b5a7',
  gold: '#f2dd72',
  sea: '#4d868c',
  note: '#1d568c',
}

export const theme = createTheme({
  palette: {
    primary: {
      main: color.crimson,
    },
    secondary: {
      main: color.note,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: color.eggplantDark,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: color.blueberry,
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      color: color.eggplant,
    },
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      color: color.eggplant,
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: color.crimsonDark,
    },
    h6: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1rem',
      color: color.eggplantDark,
    },
  }
});

