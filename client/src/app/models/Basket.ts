import type { Product } from "./Product"

export type Basket = {
  basketId: string
  items: Item[]
}

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id
    this.name= product.name
    this.brand = product.brand
    this.pictureUrl = product.pictureUrl
    this.price = product.price
    this.quantity = quantity
    this.type = product.type
  }
  productId: number
  name: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
}