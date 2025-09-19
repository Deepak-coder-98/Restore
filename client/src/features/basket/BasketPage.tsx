import { Button, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { data: basket, isLoading } = useFetchBasketQuery();

  if (isLoading) {
    return;
  }
  if (!basket || basket.items.length === 0) {
    return (
      <Paper
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
        }}
      >
        <ShoppingCart sx={{ fontSize: 100 }} color="primary" />
        <Typography gutterBottom variant="h3">
          There is nothing in your basket
        </Typography>
        <Button fullWidth component={Link} to="/catalog">
          Let's Go back to shop
        </Button>
      </Paper>
    );
  }

  const { items } = basket;
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}
