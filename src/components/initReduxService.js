import axios from "axios"
import { BaseUrl } from "../environment"


export const getSelectedProductsQuantities = async () => {

  let productQuantities = 0
  let user = JSON.parse(localStorage.getItem("cart-user"))


  const getQuantities = (cart) => {
    // 从所有购物车中拿到所有的产品id，并且将多维嵌套数组转为一维数组然后去重
    const productIds = cart.map((data) => data.products.map(product => product.productId)).flat();
    const uniqueProductIds = [...new Set(productIds)]

    // 获取所有购物车中productId对应的quantities
    const quantitiesByProductId = uniqueProductIds.map((productId) => {
      const quantities = cart.reduce((acc, curr) => {
        const product = curr.products.find((p) => p.productId == productId)
        if (product) {
          return acc + product.quantity
        } else {
          return acc
        }
      }, 0)
      return { productId, quantities };
    })

    // 获取Selected products
    let quantities = quantitiesByProductId.reduce((acc, curr) => {
      return acc + curr.quantities
    }, 0)
    return quantities
  }

  // 将axios.get()方法封装为Promise对象
  const getCartData = () => {
    return new Promise((resolve, reject) => {
      axios.get(`${BaseUrl}carts/user/${user.id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  try {
    // 使用await关键字等待Promise对象被resolved
    const cartData = await getCartData();

    // 在数据返回后执行后续代码
    productQuantities = getQuantities(cartData);
  } catch (err) {
    console.log(err);
  }

  localStorage.setItem("quantity", productQuantities.toString())
  // return productQuantities
}