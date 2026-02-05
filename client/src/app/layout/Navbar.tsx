import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function Navbar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          RE-STORE
        </Typography>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon sx={{ color: "yellow" }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
