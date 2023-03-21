import { LockOutlined } from "@mui/icons-material"
import { Avatar, Button, Paper, TextField } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { BaseUrl } from "../environment"
import { getSelectedProductsQuantities } from "./initReduxService"


const Login = () => {

  const paperStyle = { width: 300, height: '70vh', margin: '4rem auto', padding: '2rem' }
  const avatarStyle = { backgroundColor: '#33cba5' }
  const btnstyle = { margin: '1rem 0' }

  const [inputs, setInputs] = useState<any>({})


  /* 存储输入的inputs数据 */
  const handleChange = (e: any) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    axios.post(`${BaseUrl}auth/login`, inputs)
      .then((res: any) => {
        localStorage.setItem("cart-token", res.data.token)

        axios.get(`${BaseUrl}users`)
          .then((res: any) => {
            res.data.map((user: any) => {
              if (user.username === inputs.username && user.password === inputs.password) {
                localStorage.setItem('cart-user', JSON.stringify(user))
              }
            })

            // 初始化redux所需数据 
            const initReduxhData = async () => {
              await getSelectedProductsQuantities()

              setTimeout(window.location.reload() as unknown as TimerHandler, 2000)
            }
            initReduxhData()
          })
          .catch((err: any) => console.log(err))
      })
      .catch((err: any) => console.log(err))
  }


  return (
    <>
      <Paper component="div" elevation={10} sx={{ ...paperStyle, textAlign: 'center' }}>
        <Avatar sx={avatarStyle}>
          <LockOutlined />
        </Avatar>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <TextField onChange={handleChange} name="username" label="Email" placeholder="Enter your email" variant="standard" fullWidth />
          <TextField onChange={handleChange} type="password" name="password" label="Password" placeholder="Enter your password" variant="standard" fullWidth />
          <Button type="submit" variant="contained" fullWidth sx={btnstyle}>
            SIGN IN
          </Button>
        </form>
      </Paper>
    </>
  )
}

export default Login