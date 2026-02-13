import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { decrement, increment } from "./contactReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="body1">{data}</Typography>
      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement(1))}>
          Decrement
        </Button>
        <Button color="secondary" onClick={() => dispatch(increment(1))}>
          Increment
        </Button>
        <Button color="primary" onClick={() => dispatch(increment(5))}>
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
