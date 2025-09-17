import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import {useAppSelector } from "../store/Store";

function App() {
  const {isDarkMode} = useAppSelector(state => state.ui);
  const palleteType = isDarkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: palleteType,
    }
  })
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <NavBar/>
      <Box sx={{minHeight: '100vh', background: isDarkMode ? 
        'radial-gradient(circle, #050305ff, #341a3bff)' :
        'radial-gradient(circle, #baecf9, #c0a7ddff)', py: 6}}>
        <Container maxWidth = 'xl' sx={{mt: 8}}>
          <Outlet/>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
