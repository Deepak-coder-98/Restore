import type { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

type Props = {
  products : Product[]
}

export default function Catalog(props : Props) {
  const {products}= props ?? {};
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}