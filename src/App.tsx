import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductList from './components/ProductList';
import SearchNavBar from './components/SearchNavBar';
import Login from './components/Login';
import ShoppingCart from './components/ShoppingCart';
import ReduxDemo from "./components/ReduxDemo";


function App() {

  const [searchKeyWord, setSearchKeyWord] = useState("")

  const auth = localStorage.getItem('cart-token')


  return (
    <>
      {/* <ReduxDemo /> */}
      <Router>
        <SearchNavBar
          keyWord={searchKeyWord}
          setKeyWord={setSearchKeyWord}
        />
        <Routes>
          {
            auth ? (
              <Route path="/" element={<ProductList searchKeyWord={searchKeyWord} />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )
          }
          {!auth && <Route path='/' element={<Navigate to='/login' />} />}
          <Route path="/carts/user" element={<ShoppingCart />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;