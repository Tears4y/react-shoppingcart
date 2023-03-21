import { combineReducers } from "redux"


const count = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const amount = (state = 100, action) => {
  switch (action.type) {
    case 'add':
      return state + 100;
    case 'minus':
      return state - 100;
    default:
      return state;
  }
};

const selectedProducts = (state = 0, action) => {
  switch (action.type) {
    case 'selectedProducts':
      return action.payload;
    default:
      return state;
  }
}

const totalPrice = (state = 0, action) => {
  switch (action.type) {
    case 'totalPrice':
      return action.payload;
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  count,
  amount,
  selectedProducts,
  totalPrice
})

export default rootReducer