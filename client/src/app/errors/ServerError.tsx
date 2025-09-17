import { ProductionQuantityLimits } from "@mui/icons-material";
import {Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServerError() {
    return (
        <Paper 
                sx={{
                    height: 400, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent:'center',
                    alignItems: 'center',
                    p: 6
                }}
            >
                <ProductionQuantityLimits sx={{fontSize: 100}} color="primary"/>
                <Typography gutterBottom variant="h3">
                    Oops!! something went wrong
                </Typography>
                <Button fullWidth component={Link} to="/catalog">
                    Go back to shop
                </Button>
            </Paper>
    )
}