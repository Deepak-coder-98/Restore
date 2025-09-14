import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/Product"
import { Link } from "react-router-dom"

type Props = {
    product : Product
}

export default function ProductCard(props : Props) {
    const {product} = props ?? {}
    const {id : productId, name, pictureUrl, price} = product ?? {}
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
                ₹{(price / 100).toFixed(2)}     
            </Typography>
        </CardContent>
        <CardActions
            sx={{justifyContent : 'space-between'}}
        >
            <Button>Add to Cart</Button>
            <Button component={Link} to={`/catalog/${productId}`}>View</Button>
        </CardActions>
    </Card>
  )
}