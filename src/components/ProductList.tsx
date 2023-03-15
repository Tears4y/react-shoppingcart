import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, TableSortLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Stack } from '@mui/material';
import { AddCircle, Delete, Download, Edit, Upload, AddShoppingCart, ShoppingCart } from '@mui/icons-material';
import { BaseUrl } from '../environment';


const ProductList = ({ searchKeyWord }: { searchKeyWord: any }) => {

  const boxStyle = { width: '88%', padding: '0 100px 0 100px' }
  const paperStyle = { width: '100%', mb: 2 }
  const headStyle = { fontWeight: 600 }
  const iconButtonStyle = { backgroundColor: '#2149e4', color: 'white', margin: '0 10px' }
  const borderStyle = { border: '1px solid #e0e0e0' }

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchProducts, setSearchProducts] = useState([])

  const headCells = [
    { name: "title", label: "Title" },
    { name: "description", label: "Description" },
    { name: "price", label: "Price" },
    { name: "product_image", label: "Photo" },
    { name: "action", label: "Action" },
  ]

  useEffect(() => {
    axios.get(`${BaseUrl}products`)
      .then(res => {
        // console.log(res)
        setProducts(res.data)
        setSearchProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  /* 查询产品 */
  useEffect(() => {
    setProducts(
      searchProducts.filter((product: any) => {
        if (searchKeyWord === "") {
          return product
        } else if (product.title.includes(searchKeyWord) || product.description.includes(searchKeyWord)) {
          return product
        }
      })
    )
  }, [searchKeyWord])


  /* 分页 */
  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const handlePageChange = (_: any, newPage: any) => {
    setPage(newPage)
  }


  /* 模拟数据添加到购物车 */
  const handleAddProductToCart = (id: any) => {
    console.log(`add products:{productId:${id},quantity:1} to cart`)
  }


  return (
    <>
      <Box sx={boxStyle}>
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
                  products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product: any, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ ...borderStyle, width: "15%" }} align='center'>{product.title}</TableCell>
                        <TableCell sx={{ ...borderStyle, width: "35%" }} align='center'>{product.description}</TableCell>
                        <TableCell sx={{ ...borderStyle, width: "15%" }} align='center'>{product.price}</TableCell>
                        <TableCell sx={{ ...borderStyle, width: "20%" }} align='center'>
                          <img src={`${product.image}`} width="150" height="100" />
                        </TableCell>
                        <TableCell sx={{ ...borderStyle, width: "15%" }} align='center'>
                          <Button variant="contained" color='error' onClick={() => handleAddProductToCart(product.id)}>
                            Add to Cart&nbsp;&nbsp;
                            <ShoppingCart />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={borderStyle}
            component="div"
            count={products.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handlePageChange}
          />
        </Paper>
      </Box>
    </>
  )
}

export default ProductList