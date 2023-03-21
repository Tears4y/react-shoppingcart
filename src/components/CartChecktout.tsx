import { useState } from "react"
import { Button, Grid, Paper } from "@mui/material"



const CartChecktout = (props: any) => {

  const paperStyle = { width: '100%', mb: 2, border: '1px solid #e0e0e0' }


  return (
    <Paper sx={paperStyle}>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <h3>Selected products: {props.selectedProducts}</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>total: {props.totalPrice}</h3>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" disabled={props.disable} onClick={props.handleCheckoutOpen}>CheckOut</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CartChecktout