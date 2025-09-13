import { Box } from "@mui/material"
import type { Product } from "../../app/models/Product"
import ProductCard from "./ProductCard"

type Props = {
    products : Product[]
}

export default function ProductList(props : Props) {
    const {products} = props ?? {}
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
        {products.map((product)=> (
          <ProductCard key={product.id} product={product}/>
        ))}
    </Box>
  )
}