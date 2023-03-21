import { ShoppingCart } from "@mui/icons-material"
import { Button, TableBody, TableCell, TableRow } from "@mui/material"
import { Key } from "react"
import '../App.css'

const ProductListTableBody = ({ products, page, rowsPerPage }: { products: any, page: any, rowsPerPage: any }) => {

  /* 模拟数据添加到购物车 */
  const handleAddProductToCart = (id: any) => {
    console.log(`add products:{productId:${id},quantity:1} to cart`)
  }


  return (
    <TableBody>
      {
        products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((product: any, index: Key | null | undefined) => (
            <TableRow key={index}>
              <TableCell className="ProductTableCell" sx={{ width: "15%" }} >{product.title}</TableCell>
              <TableCell className="ProductTableCell" sx={{ width: "35%" }} >{product.description}</TableCell>
              <TableCell className="ProductTableCell" sx={{ width: "15%" }} >{product.price}</TableCell>
              <TableCell className="ProductTableCell" sx={{ width: "20%" }} >
                <img src={`${product.image}`} width="150" height="100" />
              </TableCell>
              <TableCell className="ProductTableCell" sx={{ width: "15%" }} >
                <Button variant="contained" color='error' onClick={() => handleAddProductToCart(product.id)}>
                  Add to Cart&nbsp;&nbsp;
                  <ShoppingCart />
                </Button>
              </TableCell>
            </TableRow>
          ))
      }
    </TableBody>
  )
}

export default ProductListTableBody