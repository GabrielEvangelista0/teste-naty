'use client';
import Link from "next/link";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h1" component="h1" fontSize="2rem" sx={{ flexGrow: 1 }}>
          Admin api deslocamento
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Link href="/" passHref>
                <Button color="inherit">Cliente</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/condutor" passHref>
                <Button color="inherit">Condutor</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/deslocamento" passHref>
                <Button color="inherit">Deslocamento</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/veiculo" passHref>
                <Button color="inherit">Veiculo</Button>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">
              <Link href="/" passHref>
                Cliente
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/condutor" passHref>
                Condutor
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/deslocamento" passHref>
                Deslocamento
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/veiculo" passHref>
                Veiculo
              </Link>
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
