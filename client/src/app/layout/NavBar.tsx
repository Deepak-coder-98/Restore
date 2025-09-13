import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
type Props = {
    darkMode : boolean
    toggleDarkMode : () => void
}
export default function NavBar(props : Props)
{
    const {darkMode, toggleDarkMode} = props ?? {}
    return (
        <AppBar position='fixed' color='primary'>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h6'>RE-STORE</Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography>Switch Mode</Typography>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode/> : <LightMode sx={{color: "yellow"}}/>}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}