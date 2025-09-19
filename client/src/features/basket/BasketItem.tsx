import { Box, Grid2 as Grid, IconButton, Paper, Typography } from "@mui/material";
import type { Item } from "../../app/models/Basket"
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
    item: Item
}

export default function BasketItem(props : Props) {
    const {item} = props || {}; 
    const {productId, pictureUrl, name, price, quantity} = item;
    const [removeBasketItem ] = useRemoveBasketItemMutation();
    const [addBasketItem ] = useAddBasketItemMutation();   
    return (
        <Paper sx={{
            height: 140,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
        }}>
            <Box display='flex' alignItems='center'>
                <Box 
                    component='img'
                    src={pictureUrl}
                    alt={name}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 8,
                        ml: 4
                    }}
                />
                <Box display='flex' flexDirection='column' gap={1}>
                    <Typography variant="h6">{name}</Typography>
                    <Box display='flex' alignItems='center' gap={3}>
                        <Typography sx={{fontSize: '1.1rem'}}>
                            {currencyFormat(price)} x {quantity}
                        </Typography>
                        <Typography sx={{fontSize: '1.1rem'}} color="primary">
                           {currencyFormat(price * quantity)}
                        </Typography>
                    </Box>
                    <Grid container spacing={1} alignItems='center'>
                        <IconButton 
                            color="error" 
                            size="small" 
                            sx={{border: 1, borderRadius: 1, minWidth: 0}}
                            onClick={() => removeBasketItem({productId, quantity: 1})}
                        >
                            <Remove/>
                        </IconButton>
                        <Typography variant="h6">{quantity}</Typography>
                        <IconButton 
                            color="success" 
                            size="small" 
                            sx={{border: 1, borderRadius: 1, minWidth: 0}}
                            onClick={() => addBasketItem({product: item, quantity : 1})}
                        >
                            <Add/>
                        </IconButton>
                    </Grid>
                </Box>
            </Box>
            <IconButton 
                color="error" 
                size="small" 
                sx={{
                    border: 1, 
                    borderRadius: 1, 
                    minWidth: 0, 
                    alignSelf: 'start', 
                    mr: 1, 
                    mt: 1
                }}
                onClick={() => removeBasketItem({productId, quantity})}
            >
                <Close/>
            </IconButton>
        </Paper>
    )
}