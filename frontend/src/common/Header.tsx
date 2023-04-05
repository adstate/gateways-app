import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "./Link";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Gateways</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
