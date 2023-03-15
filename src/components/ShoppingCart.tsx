import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, TableSortLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Stack, TextField, Grid } from '@mui/material';
import { AddCircle, Delete, Download, Edit, Upload, AddShoppingCart, RemoveCircle, DeleteForever } from '@mui/icons-material';
import { BaseUrl } from '../environment';
import Checkout from './Checkout';


const ShoppingCart = () => {

  const boxStyle = { width: '88%', padding: '0 100px 0 100px' }
  const paperStyle = { width: '100%', mb: 2 }
  const headStyle = { fontWeight: 600 }
  const iconButtonStyle = { backgroundColor: '#2149e4', color: 'white', margin: '0 10px' }
  const borderStyle = { border: '1px solid #e0e0e0' }
  const inputProps = {
    style: {
      textAlign: 'center',
      padding: '10px 0'
    }
  } as React.CSSProperties

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState(false);
  const [quantitiesByProductId, setQuantitiesByProductId] = useState<any>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [disable, setDisable] = useState(true)
  const [selectedProducts, setSelectProducts] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [open, setOpen] = useState(false)

  const headCells = [
    { name: "title", label: "Title" },
    { name: "description", label: "Description" },
    { name: "price", label: "Price" },
    { name: "product_image", label: "Photo" },
    { name: "quantity", label: "Quantity" },
    { name: "action", label: "Action" },
  ]

  let user: any = {}
  const auth = localStorage.getItem("cart-token")
  if (auth) {
    user = JSON.parse(localStorage.getItem("cart-user") as string)
  }


  /* 获取当前用户的购物车信息 */
  useEffect(() => {
    axios.get(`${BaseUrl}carts/user/${user.id}`)
      .then(res => {
        setCart(res.data)
        // console.log("cartData:", res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`${BaseUrl}products`)
      .then(res => {
        setProducts(res.data)
        // console.log("products:", res)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    getQuantitiesByProductId(cart)
    getSelectProducts(quantitiesByProductId)
    getTotalProducts(products, quantitiesByProductId)
  }, [cart])


  /* 获取购物车内所有产品id对应的商品总数 */
  const getQuantitiesByProductId = (cart: { products: any[]; }[]) => {
    // 从所有购物车中拿到所有的产品id，并且将多维嵌套数组转为一维数组然后去重
    const productIds = cart.map((data: { products: any[]; }) => data.products.map(product => product.productId)).flat();
    const uniqueProductIds = [...new Set(productIds)]

    // 获取所有购物车中productId对应的quantities
    const quantitiesByProductId = uniqueProductIds.map((productId) => {
      const quantities = cart.reduce((acc, curr: any) => {
        const product = curr.products.find((p: { productId: any; }) => p.productId == productId)
        if (product) {
          return acc + product.quantity
        } else {
          return acc
        }
      }, 0)
      return { productId, quantities };
    })
    setQuantitiesByProductId(quantitiesByProductId)
  }


  /* 获取Selected products */
  const getSelectProducts = (quantitiesByProductId: any[]) => {
    let sProducts = quantitiesByProductId.reduce((acc, curr: any) => {
      return acc + curr.quantities
    }, 0)
    setSelectProducts(sProducts)
  }


  /* 获取totalPrice */
  const getTotalProducts = (products: any[], quantitiesByProductId: any[]) => {
    const totalProducts: number[] = []
    let totalSingleProductPrice = 0
    products.map((product: any) => {
      quantitiesByProductId.map((p) => {
        if (p.productId == product.id) {
          totalSingleProductPrice = product.price * p.quantities
          totalProducts.push(totalSingleProductPrice)
        }
      })
    })
    let totalprice = totalProducts.reduce((acc, curr: any) => {
      return acc + curr
    }, 0).toFixed(2)
    let totalPriceNum = Number(totalprice);
    setTotalPrice(totalPriceNum)
    totalPriceNum > 0 ? setDisable(false) : setDisable(true)
  }

  const handleAddQuantity = (id: any, quantites: any) => {
    quantites++
    handleQuantityChange(id, quantites)
  }

  const handleReduceQuantity = (id: any, quantites: any) => {
    quantites--
    handleQuantityChange(id, quantites)
  }

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


  /* 模拟删除购物车内产品 */
  const handleDeleteCartProduct = (productId: any) => {
    const newQuantitiesByProductId = [...quantitiesByProductId]
    const itemIndex = newQuantitiesByProductId.findIndex((item) => item.productId === productId)
    newQuantitiesByProductId[itemIndex].quantities = 0
    setQuantitiesByProductId(newQuantitiesByProductId)
    getSelectProducts(newQuantitiesByProductId)
    getTotalProducts(products, newQuantitiesByProductId)
  }


  /* 分页 */
  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const handlePageChange = (_: any, newPage: any) => {
    setPage(newPage)
  }


  /* 结算相关 */
  const handleCheckoutOpen = () => {
    setOpen(true)
  }

  const handleCheckoutClose = () => {
    setOpen(false)
  }


  return (
    <>
      <Box sx={boxStyle}>
        <Paper sx={{ ...paperStyle, ...borderStyle }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
              <h3>Selected products: {selectedProducts}</h3>
            </Grid>
            <Grid item xs={2}>
              <h3>total: {totalPrice}</h3>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" disabled={disable} onClick={handleCheckoutOpen}>CheckOut</Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={paperStyle}>
          <TableContainer>
            <Table>
              <TableHead sx={borderStyle}>
                <TableRow>
                  {
                    headCells.map((headCell, index) => (
                      <TableCell
                        key={index}
                        sx={headStyle}
                        align="center"
                      >
                        {headCell.label}
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  products.map((product: any) => (
                    quantitiesByProductId.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item: any, index: React.Key | null | undefined) => (
                        product.id == item.productId && (
                          <TableRow key={index}>
                            <TableCell sx={{ ...borderStyle, width: "15%" }} align='center'>{product.title}</TableCell>
                            <TableCell sx={{ ...borderStyle, width: "30%" }} align='center'>{product.description}</TableCell>
                            <TableCell sx={{ ...borderStyle, width: "10%" }} align='center'>{product.price}</TableCell>
                            <TableCell sx={{ ...borderStyle, width: "20%" }} align='center'>
                              <img src={`${product.image}`} width="150" height="100" />
                            </TableCell>
                            <TableCell sx={{ ...borderStyle, width: "15%" }} align='center'>
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
                                    // error={error}
                                    // helperText={error ? "invalid number" : ""}
                                    // InputProps={{ inputProps: { min: 0 } }}
                                    // inputProps={{
                                    //   style: {
                                    //     'MozAppearance': 'textfield',
                                    //     'WebkitAppearance': 'textfield',
                                    //   } as React.CSSProperties
                                    // }}
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
                            <TableCell sx={{ ...borderStyle, width: "25%" }} align='center'>
                              <Button onClick={() => handleDeleteCartProduct(item.productId)}>
                                <DeleteForever fontSize='large' />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      ))
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={borderStyle}
            component="div"
            count={quantitiesByProductId.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handlePageChange}
          />
          <Checkout
            open={open}
            handleClose={handleCheckoutClose}
            totalPrice={totalPrice}
          />
        </Paper>
      </Box>
    </>
  )
}

export default ShoppingCart