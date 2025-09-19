import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { currencyFormat } from "../../lib/util";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((item) => item.productId === +productId!);
  const [qunatity, setQuantity] = useState(0);
  const { data: product, isLoading } = useFetchProductDetailsQuery(
    productId ? +productId : 0
  );
  const { name, pictureUrl, price, description, type, brand, quantityInStock } =
    product || {};
  const productDetails = [
    { label: "Name", value: name },
    { label: "Description", value: description },
    { label: "Type", value: type },
    { label: "Brand", value: brand },
    { label: "Quantity in stock", value: quantityInStock },
  ];

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  if (isLoading || !product) return;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(qunatity - item.quantity)
      : qunatity;
    if (!item || qunatity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  return (
    <Grid container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img src={pictureUrl} alt={name} style={{ width: "100%" }}></img>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(price ?? 0)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1rem" },
            }}
          >
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
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
              value={qunatity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <Button
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateBasket}
              disabled={
                (!item && qunatity === 0) || qunatity === item?.quantity
              }
            >
              {item ? "Update to basket" : "Add to Basket"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
