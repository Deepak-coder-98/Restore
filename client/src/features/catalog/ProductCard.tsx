import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/Product"
import { Link } from "react-router-dom"
import { useAddBasketItemMutation } from "../basket/basketApi"
import { currencyFormat } from "../../lib/util"

type Props = {
    product : Product
}

export default function ProductCard(props : Props) {
    const {product} = props ?? {}
    const {id : productId, name, pictureUrl, price} = product ?? {}
    const [addBasketItem, {isLoading}] = useAddBasketItemMutation();
  return (
    <Card 
        elevation={3}
        sx= {{width: 280, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
        <CardMedia 
            sx= {{height: 240, backgroundSize: 'cover'}}
            image= {pictureUrl}
            title= {name}/>
        <CardContent>
            <Typography
                gutterBottom
                sx={{textTransform: 'uppercase'}}
                variant='subtitle2'
            >
                {name}
            </Typography>
            <Typography
                variant="h6"
                sx={{color: 'secondary.main'}}
            >
                {currencyFormat(price)}     
            </Typography>
        </CardContent>
        <CardActions
            sx={{justifyContent : 'space-between'}}
        >
            <Button 
                loading={isLoading}
                loadingPosition="end"
                onClick={() => addBasketItem({product: product, quantity: 1})}>
                Add to Cart
            </Button>
            <Button component={Link} to={`/catalog/${productId}`}>View</Button>
        </CardActions>
    </Card>
  )
}