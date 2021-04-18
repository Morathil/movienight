import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import orange from '@material-ui/core/colors/orange'

export default createMuiTheme({
  palette: {
    type: 'dark',
    // primary: {
    //   light: '#3aab79',
    //   main: '#099758',
    //   dark: '#06693d'
    // },
    // secondary: {
    //   light: '#336075',
    //   main: '#003953',
    //   dark: '#00273a'
    // },
    // success: {
    //   main: purple[500]
    // },
    // background: {
    //   default: pink[50]
    // },
    // text: {
    //   primary: '#003953'
    // }
  },
  typography: {
    fontSize: 16,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: '0px'
        }
      }
    }
  }
})
