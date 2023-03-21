import { useState, useEffect } from "react"
import axios from 'axios';
import { DeleteForever } from "@mui/icons-material"
import { Button, Grid, IconButton, TableBody, TableCell, TableRow, TextField } from "@mui/material"
import { BaseUrl } from '../environment';
import store from '../store/store'
import '../App.css'
import QuantityCellOfCartTableBody from "./QuantityCellOfCartTableBody";


const CartTableBody = ({ page, rowsPerPage, quantitiesByProductId, setQuantitiesByProductId, setSelectProducts, setTotalPrice, setDisable }: { page: any, rowsPerPage: any, quantitiesByProductId: any, setQuantitiesByProductId: any, setSelectProducts: any, setTotalPrice: any, setDisable: any }) => {

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

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
    // 用户发出Redux的Action请求
    store.dispatch({ type: 'selectedProducts', payload: sProducts });
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
    // 用户发出Redux的Action请求
    store.dispatch({ type: 'totalPrice', payload: totalPriceNum });
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


  return (
    <TableBody>
      {
        products.map((product: any) => (
          quantitiesByProductId.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item: any, index: React.Key | null | undefined) => (
              product.id == item.productId && (
                <TableRow key={index}>
                  <TableCell className="ProductTableCell" sx={{ width: "15%" }}>{product.title}</TableCell>
                  <TableCell className="ProductTableCell" sx={{ width: "30%" }}>{product.description}</TableCell>
                  <TableCell className="ProductTableCell" sx={{ width: "10%" }}>{product.price}</TableCell>
                  <TableCell className="ProductTableCell" sx={{ width: "20%" }}>
                    <img src={`${product.image}`} width="150" height="100" />
                  </TableCell>
                  <QuantityCellOfCartTableBody
                    products={products}
                    item={item}
                    quantitiesByProductId={quantitiesByProductId}
                    setQuantitiesByProductId={setQuantitiesByProductId}
                    getSelectProducts={getSelectProducts}
                    getTotalProducts={getTotalProducts}

                  />
                  <TableCell className="ProductTableCell" sx={{ width: "25%" }}>
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
  )
}

export default CartTableBody