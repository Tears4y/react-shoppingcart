import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import store from '../store/store'




const Checkout = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {

  const [totalPrice, setTotalPrice] = useState(store.getState().totalPrice)


  const handleSubmitOrder = () => {
    console.log("Submit the order successfully")
    handleClose()
  }


  /* Redux监听 */
  store.subscribe(() => {
    setTotalPrice(store.getState().totalPrice);
  })


  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Confirm Order Details</DialogTitle>
        <DialogContent>
          <TextField
            size='small'
            variant="outlined"
            margin="normal"
            id="recipientName"
            label="Recipient Name"
            fullWidth
          />
          <TextField
            size='small'
            variant="outlined"
            margin="normal"
            id="address"
            label="Address"
            multiline
            maxRows={2}
            fullWidth
          />
          <TextField
            size='small'
            variant="outlined"
            margin="normal"
            id="phoneNumber"
            label="Phone Number"
            fullWidth
            sx={{ marginBottom: "2rem" }}
          />
          <FormControl sx={{ marginBottom: "2rem" }}>
            <FormLabel id="payBy-group-label">Pay By</FormLabel>
            <RadioGroup
              row
              aria-labelledby="payBy-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="reditCard" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="applePay" control={<Radio />} label="ApplePay" />
              <FormControlLabel value="wechat" control={<Radio />} label="WeChat" />
              <FormControlLabel value="aliPay" control={<Radio />} label="AliPay" />
            </RadioGroup>
          </FormControl>
          <DialogContentText>
            <b>Total:{totalPrice}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmitOrder}>Submit Order</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Checkout