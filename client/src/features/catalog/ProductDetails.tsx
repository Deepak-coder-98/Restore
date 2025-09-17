import { useParams } from "react-router-dom"
import { Button, Divider, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
    const {id: productId} = useParams();
    const {data: product, isLoading} = useFetchProductDetailsQuery(productId ? +productId : 0);



    if(isLoading || !product) return;

    const {name, pictureUrl, price, description, type, brand, quantityInStock} = product || {};
    const productDetails = [
        {label: 'Name', value: name},
        {label: 'Description', value: description},
        {label: 'Type', value: type},
        {label: 'Brand', value: brand},
        {label: 'Quantity in stock', value: quantityInStock},
    ]

    return (
        <Grid container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
            <Grid size={6}>
                <img src={pictureUrl} alt={name} style={{width: '100%'}}></img>
            </Grid>
            <Grid size={6}>
                <Typography variant="h3">{name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h4" color="secondary">${(price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table sx={{
                        '& td': {fontSize: '1rem'}
                    }}>
                        <TableBody>
                            {productDetails.map((detail, index) => (
                                <TableRow key={index}> 
                                    <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                                    <TableCell>{detail.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} marginTop={3}>
                    <Grid size={6}>
                        <TextField
                            variant="outlined"
                            type="number"
                            label="Quantity in basket"
                            fullWidth
                            defaultValue={1}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Button
                            sx={{height:'55px'}}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            Add to Basket
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}