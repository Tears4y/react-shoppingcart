import { useState } from "react"
import { Avatar, IconButton, Menu, MenuItem, Divider } from "@mui/material"
import { Email, Person, PersonAdd, Settings, Logout } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"


const PersonalInfoMenu = () => {

  const avatarStyle = { backgroundColor: '#2149e4', width: 32, height: 32 }
  const menuItemStyle = { mr: "1rem" }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()

  const handleMenuClick = (e: any) => setAnchorEl(e.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  let user: any = {}
  user = JSON.parse(localStorage.getItem("cart-user") as string)

  const logout = () => {
    localStorage.removeItem('cart-token')
    localStorage.removeItem('cart-user')
    localStorage.removeItem('quantity')
    navigate('/login')
    window.location.reload()
  }


  return (
    <>
      <IconButton sx={{ ml: 2, mr: 3 }} onClick={handleMenuClick}>
        <Avatar sx={avatarStyle} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClick={handleMenuClose}>
        <MenuItem>
          <Email color="primary" sx={menuItemStyle} /> {user?.email}
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

export default PersonalInfoMenu