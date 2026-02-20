import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import {
  useLazyGet400errorQuery,
  useLazyGet401errorQuery,
  useLazyGet404errorQuery,
  useLazyGet500errorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";

export default function AboutPage() {
  const [trigger400Error] = useLazyGet400errorQuery();
  const [trigger401Error] = useLazyGet401errorQuery();
  const [trigger404Error] = useLazyGet404errorQuery();
  const [trigger500Error] = useLazyGet500errorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  return (
    <>
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h3">
          Errors for testing
        </Typography>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={() => trigger400Error().catch((err) => console.log(err))}
          >
            Test 400 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => trigger401Error().catch((err) => console.log(err))}
          >
            Test 401 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => trigger404Error().catch((err) => console.log(err))}
          >
            Test 404 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => trigger500Error().catch((err) => console.log(err))}
          >
            Test 500 Error
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              triggerValidationError().catch((err) => console.log(err))
            }
          >
            Test Validation Error
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
