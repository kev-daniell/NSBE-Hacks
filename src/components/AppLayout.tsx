import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { AuthContext } from "@/hooks/context";
import authClient from "@/firebase/firebase";
import { signOut } from "firebase/auth";

interface Props {
  window?: () => Window;
  // children: string | JSX.Element | JSX.Element[];
}

export default function AppLayout({ window }: Props) {
  //const { window } = props;
  const router = useRouter();
  const userCtx = React.useContext(AuthContext);
  const user = userCtx?.user;
  const logout = async () => {
    signOut(authClient);
    userCtx?.setUser(undefined);
    router.push("/login");
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mt: 5,
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PillPal
        </Typography>
      </Box>

      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          {!user && (
            <>
              <ListItemButton sx={{ textAlign: "center" }} href="/login">
                <ListItemText primary={"Login"} />
              </ListItemButton>
              <ListItemButton sx={{ textAlign: "center" }} href="/signup">
                <ListItemText primary={"Signup"} />
              </ListItemButton>
            </>
          )}
          {user && (
            <ListItemButton sx={{ textAlign: "center" }} href="/create">
              <ListItemText primary={"Create"} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PillPal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box component="nav">
              <Drawer
                PaperProps={{
                  sx: { backgroundColor: "black", color: "white" },
                }}
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 240,
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PillPal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user && (
              <Button
                href="/create"
                onClick={handleDrawerToggle}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Create
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!user && (
              <>
                <Button sx={{ color: "#fff" }} href="/login">
                  Login
                </Button>
                <Button sx={{ color: "#fff" }} href="/signup">
                  Signup
                </Button>
              </>
            )}
            {user && (
              <>
                {" "}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      component="a"
                      onClick={logout}
                      textAlign="center"
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
