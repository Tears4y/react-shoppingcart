import { Grid, IconButton, TableCell, TextField } from "@mui/material"
import { AddCircle, RemoveCircle } from "@mui/icons-material"
import '../App.css'


const QuantityCellOfCartTableBody = ({ products, item, quantitiesByProductId, setQuantitiesByProductId, getSelectProducts, getTotalProducts }: { products: any, item: any, quantitiesByProductId: any, setQuantitiesByProductId: any, getSelectProducts: any, getTotalProducts: any }) => {

  /* 处理已购商品的数量改变 */
  const handleQuantityChange = (productId: any, quantities: any) => {
    let quantity = 0
    const intValue = parseInt(quantities)
    if (quantities != "" && !isNaN(intValue)) {
      quantity = parseInt(quantities)
      if (quantity < 0) {
        quantity = 0
      }
      if (quantity > 999) {
        quantity = 999
      }
    }
    const newQuantitiesByProductId = [...quantitiesByProductId]
    const itemIndex = newQuantitiesByProductId.findIndex((item) => item.productId === productId)
    // 更新输入框的值
    newQuantitiesByProductId[itemIndex].quantities = quantity
    setQuantitiesByProductId(newQuantitiesByProductId)
    getSelectProducts(newQuantitiesByProductId)
    getTotalProducts(products, newQuantitiesByProductId)
  }

  const handleAddQuantity = (id: any, quantites: any) => {
    quantites++
    handleQuantityChange(id, quantites)
  }

  const handleReduceQuantity = (id: any, quantites: any) => {
    quantites--
    handleQuantityChange(id, quantites)
  }

  return (
    <TableCell className="ProductTableCell" sx={{ width: "15%" }}>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <IconButton onClick={() => handleReduceQuantity(item.productId, item.quantities)}>
            <RemoveCircle color='primary' />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          {
            <TextField
              sx={{ width: "4rem" }}
              size='small'
              value={item.quantities}
              onChange={e => handleQuantityChange(item.productId, e.target.value)}
              inputProps={{
                style: {
                  textAlign: 'center'
                }
              }}
            />
          }
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => handleAddQuantity(item.productId, item.quantities)}>
            <AddCircle color='primary' />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  )
}

export default QuantityCellOfCartTableBody