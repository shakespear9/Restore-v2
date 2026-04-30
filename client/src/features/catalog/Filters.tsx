import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckBoxButtons from "../../app/shared/components/CheckBoxButtons";

type Props = {
  filtersData: {
    brands: string[];
    types: string[];
  };
};

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

export default function Filters({ filtersData }: Props) {
  const { orderBy, brands, types } = useAppSelector((state) => state.catalog);
  // const { data } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  // if (!data?.brands || !data?.types) {
  //   return <Typography>Loading . . . .</Typography>;
  // }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          options={sortOptions}
          selectedValue={orderBy}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckBoxButtons
          items={filtersData.brands}
          checked={brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckBoxButtons
          items={filtersData.types}
          checked={types}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>
      <Button onClick={() => dispatch(resetParams())}>Reset Filters</Button>
    </Box>
  );
}
