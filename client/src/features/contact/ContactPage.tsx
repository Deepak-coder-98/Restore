import { decrement, increment } from "./CounterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/Store";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h2">
        ContactPage
      </Typography>
      <Typography variant="body1">
        The data is: {data}
      </Typography>
      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement(2))}>Decrement</Button>
        <Button color="success" onClick={() => dispatch(increment(2))}>Increment</Button>
      </ButtonGroup>
    </>
  )
}