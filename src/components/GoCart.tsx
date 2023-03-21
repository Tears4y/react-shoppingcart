import { useEffect, useState } from "react"
import { Badge } from "@mui/material"
import { ShoppingCartCheckout } from "@mui/icons-material"
import { NavLink } from "react-router-dom"
import store from '../store/store'


const GoCart = () => {

  const quantity = localStorage.getItem("quantity")
  const [selectedProducts, setSelectProducts] = useState(quantity)


  /* Redux监听 */
  store.subscribe(() => {
    setSelectProducts(store.getState().selectedProducts);
  })


  return (
    <NavLink to={`/carts/user`} style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
      <span style={{ marginRight: '0.5rem' }}>GO TO CART</span>
      <Badge badgeContent={selectedProducts} color="error">
        <ShoppingCartCheckout fontSize='large' />
      </Badge>
    </NavLink>
  )
}

export default GoCart