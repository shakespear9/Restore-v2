import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toggleDarkMode } from "./uiSlice";

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "Contact", path: "/contact" },
  { title: "About", path: "/about" },
];
const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

export default function Navbar() {
  const { darkMode, isLoading } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Typography sx={navStyles} component={NavLink} to={"/"} variant="h6">
            RE-STORE
          </Typography>
        </Box>
        <Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={toggle}>
            {darkMode ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon sx={{ color: "yellow" }} />
            )}
          </IconButton>
          <List sx={{ display: "flex", alignItems: "center" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary"></LinearProgress>
        </Box>
      )}
    </AppBar>
  );
}
