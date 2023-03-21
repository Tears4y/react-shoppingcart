import { useState, useEffect } from 'react';
import { Box, Paper, TableSortLabel, Table, TableContainer, TablePagination } from '@mui/material';
import Checkout from './Checkout';
import CartChecktout from './CartChecktout';
import CartTableHead from './CartTableHead';
import CartTableBody from './CartTableBody';


const ShoppingCart = () => {

  const boxStyle = { width: '88%', padding: '0 100px 0 100px' }
  const paperStyle = { width: '100%', mb: 2 }
  const borderStyle = { border: '1px solid #e0e0e0' }

  const [quantitiesByProductId, setQuantitiesByProductId] = useState<any>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [disable, setDisable] = useState(true)
  const [selectedProducts, setSelectProducts] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [open, setOpen] = useState(false)


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
        <CartChecktout
          selectedProducts={selectedProducts}
          totalPrice={totalPrice}
          disable={disable}
          handleCheckoutOpen={handleCheckoutOpen}
        />
        <Paper sx={paperStyle}>
          <TableContainer>
            <Table>
              <CartTableHead />
              <CartTableBody
                page={page}
                rowsPerPage={rowsPerPage}
                quantitiesByProductId={quantitiesByProductId}
                setQuantitiesByProductId={setQuantitiesByProductId}
                setSelectProducts={setSelectProducts}
                setTotalPrice={setTotalPrice}
                setDisable={setDisable}
              />
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
          />
        </Paper>
      </Box>
    </>
  )
}

export default ShoppingCart