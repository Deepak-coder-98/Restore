import { useEffect, useState } from "react"
import type { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {

  const [products, setProducts] = useState<Product[]>([]);
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
  useEffect(() => {
    fetch("https://localhost:5001/api/product")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, []);

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <NavBar darkMode= {darkMode} toggleDarkMode={toggleDarkMode}/>
      <Box sx={{minHeight: '100vh', background: darkMode ? 
        'radial-gradient(circle, #050305ff, #341a3bff)' :
        'radial-gradient(circle, #baecf9, #c0a7ddff)', py: 6}}>
        <Container maxWidth = 'xl' sx={{mt: 8}}>
          <Catalog products = {products}/>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
