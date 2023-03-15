import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import { AppBar, Avatar, Box, Divider, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, Button, Badge } from "@mui/material"
import { Clear, Email, Logout, Person, PersonAdd, Settings, ShoppingCartCheckout } from '@mui/icons-material';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const SearchNavBar = ({ keyWord, setKeyWord }: { keyWord: string, setKeyWord: (keyWord: string) => void }) => {

  const avatarStyle = { backgroundColor: '#2149e4', width: 32, height: 32 }
  const menuItemStyle = { mr: "1rem" }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const location = useLocation()
  const isLoginPage = location.pathname.search('login') !== -1
  const navigate = useNavigate()


  const handleClear = () => setKeyWord("")

  const handleSearchChange = (e: any) => setKeyWord(e.target.value)

  const handleKeyUp = (e: any) => e.keyCode == 27 && setKeyWord("")

  const handleMenuClick = (e: any) => setAnchorEl(e.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  let user: any = {}
  user = JSON.parse(localStorage.getItem("cart-user") as string)

  const logout = () => {
    localStorage.removeItem('cart-token')
    localStorage.removeItem('cart-user')
    navigate('/login')
    window.location.reload()
  }



  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            {
              !isLoginPage && (
                <>
                  <IconButton
                    sx={{ ml: 2, mr: 3 }}
                    onClick={handleMenuClick}
                  >
                    <Avatar sx={avatarStyle} />
                  </IconButton>
                  <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClick={handleMenuClose}>
                    <MenuItem>
                      <Email color="primary" sx={menuItemStyle} /> {user.email}
                    </MenuItem>
                    <MenuItem>
                      <Person color="primary" sx={menuItemStyle} /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <PersonAdd color="primary" sx={menuItemStyle} /> Add another account
                    </MenuItem>
                    <MenuItem>
                      <Settings color="primary" sx={menuItemStyle} /> Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <Logout color="primary" sx={menuItemStyle} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )
            }
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Luxury Shopping Center
            </Typography>
            {
              !isLoginPage && (
                <>
                  <NavLink to={`/carts/user/${user.id}`} style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                    <span style={{ marginRight: '0.5rem' }}>GO TO CART</span>
                    {/* <Badge badgeContent={4} color="error"> */}
                    <ShoppingCartCheckout fontSize='large' />
                    {/* </Badge> */}
                  </NavLink>
                  <Search>
                    <SearchIconWrapper>
                      <Search />
                    </SearchIconWrapper>
                    <StyledInputBase
                      value={keyWord}
                      placeholder="Search…"
                      onChange={handleSearchChange}
                      onKeyUp={handleKeyUp}
                    />
                    <IconButton
                      onClick={handleClear}
                      sx={{ color: "white", visibility: keyWord ? "visible" : "hidden" }}>
                      <Clear />
                    </IconButton>
                  </Search>
                </>
              )
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default SearchNavBar