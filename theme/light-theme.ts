import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[100]
        },
        primary: {
            main: '#4A148C'
        },
        secondary: {
            main: '#198576B'
        },
        error: {
            main: red.A400,
        }
    },
    components: {}
})