import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { legacy_createStore as createStore } from "redux";
import store from '../store/store'
import { useDispatch, useSelector } from "react-redux";



const ReduxDemo = () => {

  // console.log(store.getState())



  const [count, setCount] = useState(store.getState().count);
  const [amount, setAmount] = useState(store.getState().amount);

  store.subscribe(() => {
    setCount(store.getState().count);
    setAmount(store.getState().amount)
  })

  const handleIncrement = () => {
    store.dispatch({ type: 'increment' })
  }

  const handleDecrement = () => {
    store.dispatch({ type: 'decrement' })
  }

  const handleAdd = () => {
    store.dispatch({ type: 'add' })
  }

  const handleMinus = () => {
    store.dispatch({ type: 'minus' })
  }


  return (
    <>
      <h1>Counter: {count}---{amount}</h1>
      <button onClick={handleIncrement}>count+</button>
      <button onClick={handleDecrement}>count-</button>
      <br />
      <button onClick={handleAdd}>amount+</button>
      <button onClick={handleMinus}>amount-</button>
    </>
  )
}

export default ReduxDemo