import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { useEffect, useState } from "react";
import { setSearchTerm } from "./catalogSlice";

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debounceSearch = debounce((event) => {
    dispatch(setSearchTerm(event.target.value));
  }, 1000);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      type="search"
      onChange={(e) => {
        setTerm(e.target.value);
        debounceSearch(e);
      }}
      value={term}
    />
  );
}
