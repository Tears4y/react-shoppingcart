import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Button, Paper, TableSortLabel, Table, TableContainer, TablePagination } from '@mui/material';
import { BaseUrl } from '../environment';
import ProductListTableHead from './ProductListTableHead';
import ProductListTableBody from './ProductListTableBody';


const ProductList = ({ searchKeyWord }: { searchKeyWord: any }) => {

  const boxStyle = { width: '88%', padding: '0 100px 0 100px' }
  const paperStyle = { width: '100%', mb: 2 }
  const borderStyle = { border: '1px solid #e0e0e0' }

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchProducts, setSearchProducts] = useState([])


  useEffect(() => {
    axios.get(`${BaseUrl}products`)
      .then(res => {
        // console.log(res)
        setProducts(res.data)
        setSearchProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  /* Navbar search products */
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


  return (
    <>
      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <TableContainer>
            <Table>
              <ProductListTableHead />
              <ProductListTableBody
                products={products}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            sx={borderStyle}
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