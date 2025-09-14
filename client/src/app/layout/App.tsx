import { useState } from "react"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const palleteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? "#eaeaea" : "#121212"
      }
    }
  })
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <NavBar darkMode= {darkMode} toggleDarkMode={toggleDarkMode}/>
      <Box sx={{minHeight: '100vh', background: darkMode ? 
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
